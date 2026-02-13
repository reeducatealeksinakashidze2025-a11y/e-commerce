import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './shared/layout/layout.component';



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
    path: 'app',
    component: LayoutComponent,
  //  canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
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
