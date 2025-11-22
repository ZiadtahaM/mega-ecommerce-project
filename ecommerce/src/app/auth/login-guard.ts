/**
 * @file login-guard.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/auth
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */




import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { serve } from '../services/serve';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: serve,
    private router: Router
  ) {}

  canActivate(): boolean {

    if (this.authService.isAuthenticated()) {
      
      console.log('User is already logged in. Redirecting to /dashboard...');
      this.router.navigate(['/dash']);
      // And prevent access to the login page
      return false;
    }

    // If they are not authenticated, allow them to access the login page
    return true;
  }
}
