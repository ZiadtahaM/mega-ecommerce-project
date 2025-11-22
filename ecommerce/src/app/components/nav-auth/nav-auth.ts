/**
 * @file nav-auth.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/nav-auth
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { serve } from '../../services/serve';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav-auth.html',
  styleUrl: './nav-auth.css'
})
export class NavAuth {
  username: null | string = null;
  islogin: boolean = true;
  showCart = false;
  
  constructor(public api: serve, private router: Router) {}
  
  ngOnInit() {
    this.username = this.api.username;
    this.islogin = this.api.isLogin;
  }
  
  toggleCart() {
    this.showCart = !this.showCart;
  }
  
  logout() {
    this.api.logout();
    this.router.navigate(['/login']);
  }
  
  increaseCartQty(item: any) {
    this.api.addToCart(item);
  }
  
  decreaseCartQty(item: any) {
    const existing = this.api.cart.find((cartItem: any) => cartItem.id === item.id);
    if (existing) {
      if (existing.quantity > 1) {
        existing.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(this.api.cart));
      } else {
        this.api.removeFromCart(item.id);
      }
    }
  }
  
  remove(item: any) {
    const existing = this.api.cart.find((cartItem: any) => cartItem.id === item.id);
    if (existing) {
      this.api.removeFromCart(item.id);
    }
  }
  
  // Navigate to checkout
  goToCheckout() {
    if (!this.api.isAuthenticated()) {
      alert('Please login first to checkout');
      this.router.navigate(['/login']);
      return;
    }
    
    if (this.api.cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    this.showCart = false; // Close cart
    this.router.navigate(['/checkout']);
  }
}
