import { Component } from '@angular/core';
import { serve } from '../services/serve';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(public api: serve, private router: Router) {}

  login() {
    // Reset error
    this.errorMessage = '';
    
    // Validation
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password';
      return;
    }
    
    this.isLoading = true;
    
    this.api.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        this.isLoading = false;
        
        // Redirect based on role
        if (this.api.isAdmin()) {
          this.router.navigate(['/dash']); // Admin goes to dashboard
        } else {
          this.router.navigate(['/home']); // Regular user goes to home
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.isLoading = false;
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
