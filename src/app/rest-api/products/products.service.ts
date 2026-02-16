import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductViewModel } from './product.viewmodel';
import { ResponseBase } from '../../shared/models/base/response-base.model';
import { PagedResult } from '../../shared/models/base/paged-result.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products'; // შენი NestJS API base URL

  constructor(private http: HttpClient) {}

  // Create
  create(product: FormData): Observable<ResponseBase<ProductViewModel>> {
    return this.http.post<ResponseBase<ProductViewModel>>(this.apiUrl, product);
  }

  // Read all
  findAll(params?: any): Observable<ResponseBase<PagedResult<ProductViewModel[]>>> {
    return this.http.get<ResponseBase<PagedResult<ProductViewModel[]>>>(this.apiUrl, { params });
  }

  // Read one
  findOne(id: string): Observable<ResponseBase<ProductViewModel>> {
    return this.http.get<ResponseBase<ProductViewModel>>(`${this.apiUrl}/${id}`);
  }

  // Update
  update(id: string, product: FormData): Observable<ResponseBase<ProductViewModel>> {
    return this.http.patch<ResponseBase<ProductViewModel>>(`${this.apiUrl}/${id}`, product);
  }

  // Delete
  remove(id: string): Observable<ResponseBase<ProductViewModel>> {
    return this.http.delete<ResponseBase<ProductViewModel>>(`${this.apiUrl}/${id}`);
  }
}
