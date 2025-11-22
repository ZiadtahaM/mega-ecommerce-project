/**
 * @file checkout.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/checkout
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { Component } from '@angular/core';
import { serve } from '../../services/serve';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
 firstName = '';
  lastName = '';
  streetAddress = '';
  townCity = '';
  state = '';
  zipCode = '';
  phone = '';
  email = '';
  orderNotes = '';
  
  // Totals
  subtotal = 0;
  shipping = 20;
  total = 0;
  
  constructor(public api: serve, private router: Router) {}
  
  ngOnInit() {
    // Check if user is logged in
    if (!this.api.isAuthenticated()) {
      alert('Please login first');
      this.router.navigate(['/login']);
      return;
    }
    
    // Check if cart has items
    if (this.api.cart.length === 0) {
      alert('Your cart is empty');
      this.router.navigate(['/']);
      return;
    }
    
    // Load user data if available
    if (this.api.username) {
      this.firstName = this.api.username;
    }
    if (this.api.email) {
      this.email = this.api.email;
    }
    
    // Calculate totals
    this.calculateTotals();
  }
  
  calculateTotals() {
    this.subtotal = this.api.getCartTotal();
    this.total = this.subtotal + this.shipping;
  }
  
  placeOrder() {
    // Validation
    if (!this.firstName || !this.lastName || !this.streetAddress || !this.zipCode || !this.phone || !this.email) {
      alert('Please fill all required fields!');
      return;
    }
    
    // Create order object
    const order = {
      userId: this.api.userid,
      userToken: localStorage.getItem('token'),
      items: this.api.cart,
      shippingAddress: {
        firstName: this.firstName,
        lastName: this.lastName,
        streetAddress: this.streetAddress,
        townCity: this.townCity,
        state: this.state,
        zipCode: this.zipCode,
        phone: this.phone,
        email: this.email
      },
      orderNotes: this.orderNotes,
      subtotal: this.subtotal,
      shipping: this.shipping,
      total: this.total,
      orderDate: new Date()
    };
    
    console.log('Order placed:', order);
    
    // Clear cart
    this.api.cart = [];
    localStorage.removeItem('cart');
    
    // Show success
    alert('Order placed successfully! Order ID: ' + Date.now());
    this.router.navigate(['/']);
  }
}
