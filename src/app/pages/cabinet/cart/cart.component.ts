import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../rest-api/carts/cart.service';
import { OrderService } from '../../../rest-api/orders/order.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Cart,  } from '../../../shared/models/cart/cart.model';
import { ShippingAddress } from '../../../shared/models/order/shipping-address.model';
import { CartItem } from '../../../shared/models/cart/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';
  userId: string = '';

  // Order form properties
  showCheckoutForm: boolean = false;
  shippingAddress: ShippingAddress = {
    street: '',
    city: '',
    postalCode: '',
    country: ''
  };
  paymentMethod: string = 'credit_card';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId() || '';
    if (this.userId) {
      this.loadCart();
    } else {
      this.errorMessage = 'Please login first';
    }
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCart(this.userId).subscribe({
      next: (response: any) => {
        this.cart = response.value || response;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading cart:', error);
        this.errorMessage = 'Failed to load cart';
        this.isLoading = false;
      }
    });
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity < 1) return;
    
    this.cartService.updateCartItem(this.userId, item.productId, newQuantity).subscribe({
      next: (response: any) => {
        this.cart = response.value || response;
      },
      error: (error: any) => {
        console.error('Error updating item:', error);
        this.errorMessage = 'Failed to update item quantity';
      }
    });
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(this.userId, productId).subscribe({
      next: (response: any) => {
        this.cart = response.value || response;
      },
      error: (error: any) => {
        console.error('Error removing item:', error);
        this.errorMessage = 'Failed to remove item';
      }
    });
  }

  proceedToCheckout(): void {
    this.showCheckoutForm = true;
  }

  cancelCheckout(): void {
    this.showCheckoutForm = false;
  }

  completeOrder(): void {
    if (!this.validateShippingAddress()) {
      this.errorMessage = 'Please fill in all shipping address fields';
      return;
    }

    this.isLoading = true;
    this.orderService.createOrderFromCart(
      this.userId,
      this.shippingAddress,
      this.paymentMethod
    ).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        alert('Order placed successfully!');
        this.router.navigate(['/cabinet/orders']);
      },
      error: (error: any) => {
        console.error('Error creating order:', error);
        this.errorMessage = error.error?.message || 'Failed to create order';
        this.isLoading = false;
      }
    });
  }

  private validateShippingAddress(): boolean {
    return !!(
      this.shippingAddress.street &&
      this.shippingAddress.city &&
      this.shippingAddress.postalCode &&
      this.shippingAddress.country
    );
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart(this.userId).subscribe({
        next: (response: any) => {
          this.cart = response.value || response;
        },
        error: (error: any) => {
          console.error('Error clearing cart:', error);
          this.errorMessage = 'Failed to clear cart';
        }
      });
    }
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }
}
