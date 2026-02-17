import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { ThemeToggleComponent } from './layouts/theme-toggle/theme-toggle.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { CloudFrontImagePipe } from './pipes/cloudfront-image.pipe';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ThemeToggleComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    CloudFrontImagePipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    HttpClientModule ,
    RouterModule
  ],
   exports: [
    HeaderComponent,
    FooterComponent,
    ThemeToggleComponent,
    CloudFrontImagePipe
  ]
})
export class CoreModule { }
