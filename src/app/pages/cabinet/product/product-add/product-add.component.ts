import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProductsService } from '../../../../rest-api/products/products.service';

@Component({
  selector: 'app-product-add',
  standalone: false,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  productForm!: FormGroup;
  selectedFiles: File[] = [];
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      description: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onFilesSelected(files: File[]): void {
    this.selectedFiles = files;
  }

  save(): void {
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

    this.productService.create(formData).subscribe({
      next: (response) => {
        console.log('პროდუქტი შეიქმნა:', response);
        this.router.navigate(['/cabinet/products']);
      },
      error: (error) => {
        console.error('შეცდომა:', error);
        this.errorMessage = error.error?.message || this.translate.instant('product.errors.createFailed');
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/cabinet/products']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}