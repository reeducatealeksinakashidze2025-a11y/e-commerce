import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cart,  } from '../../shared/models/cart/cart.model';
import { ResponseBase } from '../../shared/models/base/response-base.model';
import { CartItem } from '../../shared/models/cart/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/carts`;

  constructor(private http: HttpClient) {}

  // Add item to cart
  addToCart(userId: string, cartItem: CartItem): Observable<ResponseBase<Cart>> {
    return this.http.post<ResponseBase<Cart>>(
      `${this.apiUrl}/${userId}`,
      cartItem
    );
  }

  // Get all items in user's cart
  getCart(userId: string): Observable<ResponseBase<Cart>> {
    return this.http.get<ResponseBase<Cart>>(`${this.apiUrl}/${userId}`);
  }

  // Update cart item quantity
  updateCartItem(
    userId: string,
    productId: string,
    quantity: number
  ): Observable<ResponseBase<Cart>> {
    return this.http.patch<ResponseBase<Cart>>(
      `${this.apiUrl}/${userId}/${productId}`,
      { quantity }
    );
  }

  // Remove item from cart
  removeFromCart(userId: string, productId: string): Observable<ResponseBase<Cart>> {
    return this.http.delete<ResponseBase<Cart>>(
      `${this.apiUrl}/${userId}/${productId}`
    );
  }

  // Clear entire cart
  clearCart(userId: string): Observable<ResponseBase<Cart>> {
    return this.http.delete<ResponseBase<Cart>>(
      `${this.apiUrl}/${userId}/clear`
    );
  }
}
