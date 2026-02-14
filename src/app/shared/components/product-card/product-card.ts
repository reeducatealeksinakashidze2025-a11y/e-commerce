import { Component, Input } from '@angular/core';
import { Products } from '../../models/product/products.model';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
@Input() product!: Products;
}
