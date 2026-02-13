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
      constructor(private http: HttpClient, private userService: UserService) { }




   login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-in`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem(this.TOKEN_KEY, response.value); 
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
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
     isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token && !this.isTokenExpired(token);
  }

  // Example method to decode and check token expiration
  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    return expiry ? expiry * 1000 < Date.now() : true;
  }

 public getCurrentUser(): Observable<User | undefined> {
  const token = this.getToken();
  if (!token) return of(undefined); // RxJS of()

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return this.userService.getById(payload.userId).pipe(
      map(user => ({
        _id: user._id,
        name: user.fullName,
        email: user.email
      })),
      catchError(() => of(undefined))
    );
  } catch {
    return of(undefined);
  }
}

}
