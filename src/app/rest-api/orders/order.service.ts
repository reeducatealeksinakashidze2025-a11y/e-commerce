import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../../shared/models/order/order.model';
import { ResponseBase } from '../../shared/models/base/response-base.model';
import { ShippingAddress } from '../../shared/models/order/shipping-address.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  // Create order from cart
  createOrderFromCart(
    userId: string,
    shippingAddress: ShippingAddress,
    paymentMethod: string
  ): Observable<ResponseBase<Order>> {
    return this.http.post<ResponseBase<Order>>(
      `${this.apiUrl}/from-cart/${userId}`,
      { shippingAddress, paymentMethod }
    );
  }

  // Get all orders with filters
  getOrders(params?: any): Observable<ResponseBase<Order[]>> {
    return this.http.get<ResponseBase<Order[]>>(this.apiUrl, { params });
  }

  // Get user's orders
  getUserOrders(userId: string, params?: any): Observable<ResponseBase<Order[]>> {
    return this.http.get<ResponseBase<Order[]>>(
      `${this.apiUrl}/user/${userId}`,
      { params }
    );
  }

  // Get order by ID
  getOrderById(orderId: string): Observable<ResponseBase<Order>> {
    return this.http.get<ResponseBase<Order>>(`${this.apiUrl}/${orderId}`);
  }

  // Update order status
  updateOrderStatus(orderId: string, status: string): Observable<ResponseBase<Order>> {
    return this.http.patch<ResponseBase<Order>>(
      `${this.apiUrl}/${orderId}`,
      { status }
    );
  }

  // Delete order (if needed)
  deleteOrder(orderId: string): Observable<ResponseBase<Order>> {
    return this.http.delete<ResponseBase<Order>>(`${this.apiUrl}/${orderId}`);
  }
}
