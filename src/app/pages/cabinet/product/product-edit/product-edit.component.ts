import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProductsService } from '../../../../rest-api/products/products.service';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  productId!: string;
  selectedFiles: File[] = [];
  existingImages: string[] = [];
  removedExistingImages: number[] = [];
  
  isSubmitting = false;
  isLoading = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.initForm();
    this.loadProduct();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      description: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      isDiscounted: [false, Validators.required],
    });
  }

  loadProduct(): void {
    this.productService.findOne(this.productId).subscribe({
      next: (productResult) => {
        const product = productResult.value!;

        this.productForm.patchValue({
          name: product.name,
          category: product.category,
          description: product.description || '',
          quantity: product.quantity,
          price: product.price,
          isDiscounted: product.isDiscounted || false,
        });
        this.existingImages = product.images || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.errorMessage = this.translate.instant('product.errors.loadFailed');
        this.isLoading = false;
      }
    });
  }

  onFilesSelected(files: File[]): void {
    this.selectedFiles = files;
  }

  onExistingImageRemoved(index: number): void {
    this.removedExistingImages.push(index);
    this.existingImages.splice(index, 1);
  }

  update(): void {
    if (this.productForm.invalid) {
      this.markFormGroupTouched(this.productForm);
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formData = new FormData();
    
    Object.keys(this.productForm.value).forEach(key => {
      formData.append(key, this.productForm.value[key]);
    });

    this.selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    if (this.removedExistingImages.length > 0) {
      formData.append('removedImages', JSON.stringify(this.removedExistingImages));
    }

    this.productService.update(this.productId, formData).subscribe({
      next: (response) => {
        console.log('პროდუქტი განახლდა:', response);
        this.router.navigate(['/products', this.productId]);
      },
      error: (error) => {
        console.error('შეცდომა:', error);
        this.errorMessage = error.error?.message || this.translate.instant('product.errors.updateFailed');
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/products', this.productId]);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
