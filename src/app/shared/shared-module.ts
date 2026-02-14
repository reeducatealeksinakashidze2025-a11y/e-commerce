import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { ProductCard } from './components/product-card/product-card';




@NgModule({
  declarations: [
   
    LoadingSpinnerComponent,
    PaginationComponent,
    ProductCard,
  ],
  imports: [
    CommonModule,
      FormsModule,
      RouterModule 
  ],
  exports: [
   
LoadingSpinnerComponent,
    PaginationComponent,
     ProductCard

  ]
})
export class SharedModule { }
