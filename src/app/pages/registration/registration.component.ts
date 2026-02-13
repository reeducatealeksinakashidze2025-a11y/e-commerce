import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
fullName: string = '';
 
  birthDate: string = '';
  gender: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  register(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill out all required fields!';
      return;
    }
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Invalid email address!';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
    this.errorMessage=null;
    const user = {
      fullName: this.fullName,
      birthDate: this.birthDate,
      gender: Number(this.gender),
      userName: this.username,
      password: this.password,
      email:this.email
    };

    this.authService.register(user).subscribe(
      (res) => {
        alert(res.message)
        this.router.navigate(['auth/login']);
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    );
  }
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(email);
  }

}
