// products-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../rest-api/products/products.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,  
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  searchTerm: string = '';
  
  // Pagination
  page: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;

  // Filters
  selectedCategory: number | null = null;
  priceFrom: number | null = null;
  priceTo: number | null = null;
  isDiscounted: boolean | null = null;

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    
    const params: any = {
      page: this.page,
      take: this.pageSize,
    };

    if (this.searchTerm) {
      params.search = this.searchTerm;
    }
    
    if (this.selectedCategory) {
      params.category = this.selectedCategory;
    }
    
    if (this.priceFrom !== null) {
      params.priceFrom = this.priceFrom;
    }
    
    if (this.priceTo !== null) {
      params.priceTo = this.priceTo;
    }
    
    if (this.isDiscounted !== null) {
      params.isActive = this.isDiscounted;
    }

    this.productService.findAll(params).subscribe({
      next: (response: any) => {
        this.products = response.data || response;
        this.totalCount = response.totalCount || response.length;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
        this.errorMessage = 'პროდუქტების ჩატვირთვა ვერ მოხერხდა';
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.page = 1; // Reset to first page on search
    this.loadProducts();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadProducts();
  }

  onFilterChange(): void {
    this.page = 1; // Reset to first page on filter change
    this.loadProducts();
  }

  viewProduct(id: string): void {
    this.router.navigate(['./products', id], { relativeTo: this.route });
  }

  editProduct(id: string): void {
    this.router.navigate(['./products', id, 'edit'], { relativeTo: this.route });
  }

  createProduct(): void {
    this.router.navigate(['./products/new'], { relativeTo: this.route });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = null;
    this.priceFrom = null;
    this.priceTo = null;
    this.isDiscounted = null;
    this.page = 1;
    this.loadProducts();
  }
}