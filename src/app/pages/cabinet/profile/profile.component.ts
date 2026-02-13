import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserService } from '../../../rest-api/users/user.service';
import { User } from '../../../rest-api/users/user.model';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent  implements OnInit {


  user?: User;
  form!: FormGroup;
  loading = false;
  editing = false;

  constructor(private userService: UserService, private fb: FormBuilder, private authService:AuthService ) {}

  ngOnInit(): void {
     this.loadCurrentUser();
  }

 loadCurrentUser() {
  this.loading = true;

  // ჩაკვეთილი getCurrentUser() რომელიც Observable<User> აბრუნებს
  this.authService.getCurrentUser().subscribe({
    next: (user) => {
      this.user = user;
      if (user) {
        this.form = this.fb.group({
          name: [user.name, Validators.required],
          email: [user.email, [Validators.required, Validators.email]]
        });
      }
      this.loading = false;
    },
    error: (err) => {
      console.error('Failed to load current user', err);
      this.loading = false;
    }
  });
}

  toggleEdit() {
    this.editing = !this.editing;
  }

  save() {
    if (!this.form.valid || !this.user) return;
    this.userService.update(this.user._id!, this.form.value).subscribe({
      next: (updated) => {
        this.user = updated;
        this.editing = false;
      },
      error: (err) => console.error(err)
    });
  }


}
