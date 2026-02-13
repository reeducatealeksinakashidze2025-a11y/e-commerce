import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
 email: string = '';
  password: string = '';
 loginError: string = '';
  constructor(
    private authService: AuthService,
    private router: Router) { }
    ngOnInit(): void {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['app']);;
      }
    }


   onSubmit() {
       this.loginError = '';
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['app']);;
      }
      this.authService.login(this.email, this.password)
        .subscribe(response => {
          this.router.navigate(['app']);
          // ავტორიზაციის წარმატების შემთხვევაში
        }, error => {
          // აქ შეგიძლია წაიღო error-ის ტექსტი
        if (error.status === 401) {
          this.loginError = 'მომხმარებლის სახელი ან პაროლი არასწორია.';
        } else if (error.status === 0) {
          this.loginError = 'სერვერთან კავშირი ვერ ხერხდება.';
        } else {
          this.loginError = error.error?.message || 'დაფიქსირდა შეცდომა. სცადეთ კიდევ ერთხელ.';
        }
        });
    }
  //    onSubmit() {
  //   this.loginError = '';

  //   this.authService.login(this.email, this.password).subscribe({
  //     next: (response) => {
  //       // წარმატების შემთხვევაში navigate მხოლოდ აქ
  //       this.router.navigate(['app/cabinet']);
  //     },
  //     error: (error) => {
  //       if (error.status === 401) {
  //         this.loginError = 'მომხმარებლის სახელი ან პაროლი არასწორია.';
  //       } else if (error.status === 0) {
  //         this.loginError = 'სერვერთან კავშირი ვერ ხერხდება.';
  //       } else {
  //         this.loginError = error.error?.message || 'დაფიქსირდა შეცდომა. სცადეთ კიდევ ერთხელ.';
  //       }
  //     },
  //   });
  // }
}
