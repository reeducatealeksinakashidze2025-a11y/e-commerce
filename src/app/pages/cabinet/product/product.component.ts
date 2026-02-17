// products.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProductsService } from '../../../rest-api/products/products.service';
import { ProductCategory } from '../../../shared/enums/products-category.enum';
import { CloudFrontImageService } from '../../../core/services/cloudfront-image.service';

@Component({
  selector: 'app-product',
  standalone: false,

  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private cloudFrontImageService: CloudFrontImageService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.findAll().subscribe({
      next: (response: any) => {
        this.products = response.data || response;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
        this.errorMessage = 'პროდუქტების ჩატვირთვა ვერ მოხერხდა';
        this.isLoading = false;
      }
    });
  }

  getCategoryName(categoryId: number): string {
    return this.translate.instant(`product.category.${ProductCategory[categoryId]}`);
  }

  getMainImage(product: any): string {
    const imageName = product?.images?.[0];
    if (!imageName) {
      return 'assets/images/no-image.png';
    }
    return this.cloudFrontImageService.getImageUrl(imageName);
  }

  add(): void {
    this.router.navigate(['./products/new'], { relativeTo: this.route.parent });
  }

  edit(id: string): void {
    this.router.navigate(['./products', id, 'edit'], { relativeTo: this.route.parent });
  }

  view(id: string): void {
    this.router.navigate(['./products', id], { relativeTo: this.route.parent });
  }

  delete(id: string): void {
    const confirmMessage = this.translate.instant('product.confirmDelete');
    if (!confirm(confirmMessage)) return;

    this.productService.remove(id).subscribe({
      next: () => {
        this.loadProducts(); // Reload list after deletion
      },
      error: (error: any) => {
        console.error('შეცდომა:', error);
        this.errorMessage = 'პროდუქტის წაშლა ვერ მოხერხდა';
      }
    });
  }
}