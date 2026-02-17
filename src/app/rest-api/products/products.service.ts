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
  private apiUrl = 'http://localhost:3000/products'; // NestJS API base URL

  constructor(private http: HttpClient) {}

  // Create
  create(product: FormData): Observable<ResponseBase<ProductViewModel>> {
    return this.http.post<ResponseBase<ProductViewModel>>(this.apiUrl, product);
  }

  // Read all - handles both paginated and non-paginated responses
  findAll(params?: any): Observable<any> {
    return this.http.get<any>(this.apiUrl, { params });
  }

  // Read one
  findOne(id: string): Observable<ResponseBase<ProductViewModel>> {
    return this.http.get<ResponseBase<ProductViewModel>>(`${this.apiUrl}/${id}`);
  }

  // Update
  update(id: string, product: FormData | Partial<ProductViewModel>): Observable<ResponseBase<ProductViewModel>> {
    return this.http.patch<ResponseBase<ProductViewModel>>(`${this.apiUrl}/${id}`, product);
  }

  // Delete
  remove(id: string): Observable<ResponseBase<ProductViewModel>> {
    return this.http.delete<ResponseBase<ProductViewModel>>(`${this.apiUrl}/${id}`);
  }
}

