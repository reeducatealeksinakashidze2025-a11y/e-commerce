import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../rest-api/products/products.service';
import { Products } from '../../shared/models/product/products.model';
// import { Blog } from '../../shared/models/blog/blog.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
   product: Products[] = [];

  constructor(
    private productsService: ProductsService,
     private router: Router) {}

  ngOnInit() {
    this.loadLatestProducts();
  }

  loadLatestProducts() {
    this.productsService.findAll().subscribe((res: any) => {
      const items = Array.isArray(res) ? res : (res.value?.items || res.data || []);
      this.product = items
       .sort((a: any, b: any) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  })
        .slice(0, 10);
    });
  }

  // goToBlog(blogId: string) {
  //   this.router.navigate(['/blog', blogId]);
  // }
}
