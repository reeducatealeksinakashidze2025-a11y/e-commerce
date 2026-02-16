// product-fields.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PRODUCT_CATEGORIES, ProductCategory } from '../../enums/products-category.enum';

interface CategoryOption {
  value: ProductCategory;
  label: string;
}

@Component({
  selector: 'app-product-fields',
  standalone: false,
  templateUrl: './product-fields.component.html',
  styleUrls: ['./product-fields.component.css']
})
export class ProductFieldsComponent implements OnInit {
  @Input() productForm!: FormGroup;
  
  categories: CategoryOption[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadCategories();
    
    // ენის შეცვლისას განაახლე კატეგორიები
    this.translate.onLangChange.subscribe(() => {
      this.loadCategories();
    });
  }

  loadCategories(): void {
    this.categories = PRODUCT_CATEGORIES.map(category => ({
      value: category,
      label: this.translate.instant(
        `product.category.${ProductCategory[category]}`
      )
    }));
  }

  // დამატებული მეთოდი FormControl-ის დასაბრუნებლად
  getFormControl(fieldName: string): FormControl {
    return this.productForm.get(fieldName) as FormControl;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    if (field?.hasError('required')) {
      return this.translate.instant('product.validation.required');
    }
    if (field?.hasError('min')) {
      return this.translate.instant('product.validation.minValue', { 
        min: field.errors?.['min'].min 
      });
    }
    if (field?.hasError('minlength')) {
      return this.translate.instant('product.validation.minLength', { 
        length: field.errors?.['minlength'].requiredLength 
      });
    }
    return '';
  }
}