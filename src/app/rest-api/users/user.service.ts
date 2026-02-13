import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ResponseBase } from '../../shared/models/base/response-base.model';
import { User } from './user.model';
import { Author } from '../auth/author.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<ResponseBase<User[]>>(this.apiUrl).pipe(
      map(res => res.value || [])
    );
  }

  getById(id: string): Observable<Author> {
    return this.http.get<ResponseBase<Author>>(`${this.apiUrl}/${id}`).pipe(
      map(res => res.value!)
    );
  }

  update(id: string, user: Partial<User>): Observable<User> {
    return this.http.patch<ResponseBase<User>>(`${this.apiUrl}/${id}`, user).pipe(
      map(res => res.value!)
    );
  }

  delete(id: string): Observable<User> {
    return this.http.delete<ResponseBase<User>>(`${this.apiUrl}/${id}`).pipe(
      map(res => res.value!)
    );
  }
}
