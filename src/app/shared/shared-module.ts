import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { ProductFieldsComponent } from './components/product-fields/product-fields.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { TranslateModule } from "@ngx-translate/core";




@NgModule({
  declarations: [
   
    LoadingSpinnerComponent,
    PaginationComponent,
    ProductFieldsComponent,
    ProductCardComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
      FormsModule,
      RouterModule,
      TranslateModule,
      ReactiveFormsModule 
  ],
  exports: [
   
    LoadingSpinnerComponent,
    PaginationComponent,
    ProductFieldsComponent,
    ProductCardComponent,
    FileUploadComponent
  ]
})
export class SharedModule { }
