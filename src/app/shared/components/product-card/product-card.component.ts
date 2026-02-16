// product-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductCategory } from '../../enums/products-category.enum';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() view = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

  constructor(private translate: TranslateService) {}

  getCategoryName(): string {
    if (!this.product) return '';
    return this.translate.instant(`product.category.${ProductCategory[this.product.category]}`);
  }

  getMainImage(): string {
    return this.product?.images?.[0] || 'assets/images/no-image.png';
  }

  onView(): void {
    this.view.emit(this.product._id);
  }

  onEdit(): void {
    this.edit.emit(this.product._id);
  }
}