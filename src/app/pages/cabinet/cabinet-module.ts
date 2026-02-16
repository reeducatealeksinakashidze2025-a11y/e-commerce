import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetRoutingModule } from './cabinet-routing-module';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../core/core-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    LayoutComponent,
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    TranslateModule,
    CoreModule,
   // QuillModule.forRoot() ,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ]
})
export class CabinetModule { }
