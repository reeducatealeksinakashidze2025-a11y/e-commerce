import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';



// const routes: Routes = [
//     {
//     path: 'app', 
//     component: LayoutComponent,
//     children: [
//       { path: 'dashboard', component: DashboardComponent },
//       { path: 'my-articles', component: MyArticlesComponent },
//       { path: 'profile', component: ProfileComponent },
//       { path: 'blog/add', component: AddBlogComponent },
//       { path: 'blog/edit/:id', component: EditBlogComponent },
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' } 
//     ]
//   }
// ];

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  //  canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductComponent },
      { path: 'products/new', component: ProductAddComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'products/:id/edit', component: ProductEditComponent },
      { path: 'cart', component: CartComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
