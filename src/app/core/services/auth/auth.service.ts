import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../rest-api/users/user.service';
import { User } from '../../../rest-api/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private readonly TOKEN_KEY = 'jwt_token';
    private readonly USER_ID_KEY = 'user_id';
      constructor(private http: HttpClient, private userService: UserService) { }




   login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-in`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem(this.TOKEN_KEY, response.value);
        // Decode token to extract userId
        const payload = this.decodeToken(response.value);
        if (payload && payload.userId) {
          localStorage.setItem(this.USER_ID_KEY, payload.userId);
        }
      }),
      map(() => this.getCurrentUser())
    );
  }
    register(resourse:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sign-up`, resourse);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY);
  }

     isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token && !this.isTokenExpired(token);
  }

  // Decode JWT token
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  // Example method to decode and check token expiration
  private isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    const expiry = payload?.exp;
    return expiry ? expiry * 1000 < Date.now() : true;
  }

 public getCurrentUser(): Observable<User | undefined> {
  const userId = this.getUserId();
  if (!userId) return of(undefined);

  return this.userService.getById(userId).pipe(
    map(user => ({
      _id: user._id,
      name: user.userName || user.email,
      email: user.email
    })),
    catchError(() => of(undefined))
  );
}

}
