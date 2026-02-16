import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProductsService } from '../../../../rest-api/products/products.service';
import { ProductCategory } from '../../../../shared/enums/products-category.enum';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  productId!: string;
  currentImageIndex: number = 0;
  isLoading = true;
  errorMessage = '';
  isDeleting = false;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.findOne(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.errorMessage = this.translate.instant('product.errors.loadFailed');
        this.isLoading = false;
      }
    });
  }

  getCategoryName(): string {
    if (!this.product) return '';
    return this.translate.instant(`product.category.${ProductCategory[this.product.category]}`);
  }

  previousImage(): void {
    if (this.product?.images?.length) {
      this.currentImageIndex = 
        this.currentImageIndex === 0 
          ? this.product.images.length - 1 
          : this.currentImageIndex - 1;
    }
  }

  nextImage(): void {
    if (this.product?.images?.length) {
      this.currentImageIndex = 
        this.currentImageIndex === this.product.images.length - 1 
          ? 0 
          : this.currentImageIndex + 1;
    }
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  editProduct(): void {
    this.router.navigate(['/products', this.productId, 'edit']);
  }

  deleteProduct(): void {
    const confirmMessage = this.translate.instant('product.confirmDelete');
    if (!confirm(confirmMessage)) return;

    this.isDeleting = true;
    this.productService.remove(this.productId).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('შეცდომა:', error);
        this.errorMessage = error.error?.message || this.translate.instant('product.errors.deleteFailed');
        this.isDeleting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
