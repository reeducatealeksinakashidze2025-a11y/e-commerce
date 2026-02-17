import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../rest-api/orders/order.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Order } from '../../../shared/models/order/order.model';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  userId: string = '';
  selectedOrder: Order | null = null;

  // Pagination and filtering
  page: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  
  statusFilter: string = '';
  searchTerm: string = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId() || '';
    if (this.userId) {
      this.loadOrders();
    } else {
      this.errorMessage = 'Please login first';
    }
  }

  loadOrders(): void {
    this.isLoading = true;
    const params: any = {
      page: this.page,
      take: this.pageSize,
    };

    if (this.statusFilter) {
      params.status = this.statusFilter;
    }

    if (this.searchTerm) {
      params.search = this.searchTerm;
    }

    this.orderService.getUserOrders(this.userId, params).subscribe({
      next: (response: any) => {
        this.orders = response.value || response.data || response;
        if (Array.isArray(this.orders)) {
          this.totalCount = this.orders.length;
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading orders:', error);
        this.errorMessage = 'Failed to load orders';
        this.isLoading = false;
      }
    });
  }

  viewOrderDetails(order: Order): void {
    this.selectedOrder = order;
  }

  closeOrderDetails(): void {
    this.selectedOrder = null;
  }

  downloadInvoice(orderId: string): void {
    // This would require a backend endpoint to generate PDF
    console.log('Download invoice for order:', orderId);
    alert('Invoice download feature coming soon!');
  }

  onFilterChange(): void {
    this.page = 1;
    this.loadOrders();
  }

  onSearch(): void {
    this.page = 1;
    this.loadOrders();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadOrders();
  }

  getStatusBadgeClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'badge-warning';
      case 'processing':
        return 'badge-info';
      case 'shipped':
        return 'badge-primary';
      case 'delivered':
        return 'badge-success';
      case 'cancelled':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }

  getOrderNumber(orderId: string | undefined): string {
    if (!orderId) return 'N/A';
    return orderId.substring(Math.max(0, orderId.length - 8)).toUpperCase();
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }
}
