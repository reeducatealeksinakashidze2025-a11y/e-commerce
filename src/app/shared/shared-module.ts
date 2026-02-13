import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { PaginationComponent } from "./components/pagination/pagination.component";




@NgModule({
  declarations: [
   
    LoadingSpinnerComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
      FormsModule,
      RouterModule 
  ],
  exports: [
   
LoadingSpinnerComponent,
    PaginationComponent

  ]
})
export class SharedModule { }
