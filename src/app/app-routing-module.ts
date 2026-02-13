import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

const routes: Routes = [
   {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: "full"},
      // { path: 'blogs', component: BlogComponent },
      { path: 'about', component: AboutComponent },
      // { path: 'newsletter', component: NewsletterComponent },
      // { path: 'blog/:id', component: BlogDetailComponent },
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
    ],
  },
   {
    path: 'cabinet',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/cabinet/cabinet-module').then(m => m.CabinetModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
