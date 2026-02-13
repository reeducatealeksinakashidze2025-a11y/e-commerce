import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared-module';



@NgModule({
  declarations: [
    AboutComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
   
  ],
  imports: [
    CommonModule,
     FormsModule,
     RouterModule,
     SharedModule
  ]
})
export class PagesModule { }
