/**
 * Cart Service
 * 
 * Service responsible for managing shopping cart operations.
 * This service handles cart state management and business logic.
 * 
 * Following clean architecture principles:
 * - This is part of the application layer
 * - It uses domain models (CartItem)
 * - It provides a clean interface for cart operations
 * 
 * @class CartService
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, calculateCartItemSubtotal } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Private BehaviorSubject to hold cart state
  // BehaviorSubject ensures new subscribers get the current value immediately
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  
  // Public Observable for components to subscribe to cart changes
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor() {
    // Initialize cart from localStorage if available
    this.loadCartFromStorage();
  }

  /**
   * Get current cart items synchronously
   * @returns Array of current cart items
   */
  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  /**
   * Add item to cart or update quantity if item already exists
   * @param item - The cart item to add
   */
  addToCart(item: CartItem): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(
      cartItem => cartItem.productId === item.productId
    );

    let updatedItems: CartItem[];

    if (existingItemIndex >= 0) {
      // Item exists, update quantity
      updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      updatedItems[existingItemIndex].subtotal = calculateCartItemSubtotal(
        updatedItems[existingItemIndex]
      );
    } else {
      // New item, add to cart
      updatedItems = [...currentItems, { ...item, subtotal: calculateCartItemSubtotal(item) }];
    }

    this.updateCart(updatedItems);
  }

  /**
   * Remove item from cart by product ID
   * @param productId - The product ID to remove
   */
  removeFromCart(productId: string): void {
    const updatedItems = this.cartItemsSubject.value.filter(
      item => item.productId !== productId
    );
    this.updateCart(updatedItems);
  }

  /**
   * Update item quantity in cart
   * @param productId - The product ID to update
   * @param quantity - New quantity (must be > 0)
   */
  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const updatedItems = this.cartItemsSubject.value.map(item => {
      if (item.productId === productId) {
        const updatedItem = { ...item, quantity };
        updatedItem.subtotal = calculateCartItemSubtotal(updatedItem);
        return updatedItem;
      }
      return item;
    });

    this.updateCart(updatedItems);
  }

  /**
   * Clear all items from cart
   */
  clearCart(): void {
    this.updateCart([]);
  }

  /**
   * Calculate total cart value
   * @returns Total amount of all items in cart
   */
  getCartTotal(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.subtotal,
      0
    );
  }

  /**
   * Get total number of items in cart
   * @returns Total quantity of all items
   */
  getCartItemCount(): number {
    return this.cartItemsSubject.value.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }

  /**
   * Check if cart is empty
   * @returns True if cart has no items
   */
  isCartEmpty(): boolean {
    return this.cartItemsSubject.value.length === 0;
  }

  /**
   * Update cart state and persist to localStorage
   * @param items - New cart items array
   */
  private updateCart(items: CartItem[]): void {
    this.cartItemsSubject.next(items);
    this.saveCartToStorage(items);
  }

  /**
   * Save cart to localStorage for persistence
   * @param items - Cart items to save
   */
  private saveCartToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  /**
   * Load cart from localStorage
   */
  private loadCartFromStorage(): void {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const items: CartItem[] = JSON.parse(savedCart);
        // Recalculate subtotals in case of data corruption
        const validatedItems = items.map(item => ({
          ...item,
          subtotal: calculateCartItemSubtotal(item)
        }));
        this.cartItemsSubject.next(validatedItems);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      this.cartItemsSubject.next([]);
    }
  }
}


