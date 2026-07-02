import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { serve } from '../../services/serve';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class register {
  model = {
    first_name: null,
    last_name: null,
    phone: null,
    email: null,
    password: null, 
    confirm_password: null
  }

  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private api: serve,
    private router: Router
  ) {}

  passmatch(): boolean {
    return this.model.password === this.model.confirm_password;
  }

  handleSubmit(form: NgForm) {
    if (form.valid && this.passmatch()) {
      this.isLoading = true;
      this.errorMessage = null;
      this.api.register(this.model).subscribe({
        next: (res) => {
          console.log('Register Response:', res);
          this.isLoading = false;
          this.router.navigateByUrl('/home'); 
        },
        error: (err) => {
          console.error('Register Error:', err);
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        }
      });
    }
  }
}

