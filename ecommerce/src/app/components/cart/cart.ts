/**
 * @file cart.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/cart
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serve } from '../../services/serve';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart  implements OnInit {
  
  constructor(public api: serve, private router: Router) {}
  
  ngOnInit() {
    console.log('Cart items:', this.api.cart);
  }
  
  increaseQuantity(item: any) {
    item.quantity++;
    this.updateCart();
  }
 

  
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }
  
  removeItem(productId: any) {
  try {
    this.api.removeFromCart(productId);
    console.log('Item removed from cart');
  } catch (error) {
    console.error('Failed to remove item:', error);
    alert('Failed to remove item. Please try again.');
  }
}
isProcessing = false;

async placeOrder() {
  if (this.isProcessing) return; 
  
  this.isProcessing = true;
  
  try {
   
    this.isProcessing = false;
  } catch (error) {
    this.isProcessing = false;
    alert('Order failed. Please try again.');
  }
}

  
  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
  }
  
  getItemTotal(item: any) {
    return item.price * item.quantity;
  }
  
  continueShopping() {
    this.router.navigate(['/']);
  }
  
  checkout() {
    if (this.api.cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Proceeding to checkout...');
  }
}


