/**
 * Order Service
 * 
 * Service responsible for order management operations.
 * This service handles order creation, retrieval, and status updates.
 * 
 * Following clean architecture principles:
 * - This is part of the application layer
 * - It uses domain models (Order, Address, CartItem)
 * - It communicates with the infrastructure layer (HTTP client) for API calls
 * 
 * @class OrderService
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, calculateOrderTotal, calculateTax } from '../models/order.model';
import { Address } from '../models/address.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // API base URL - should be moved to environment configuration
  private readonly apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  /**
   * Create a new order
   * @param items - Cart items to include in the order
   * @param shippingAddress - Shipping address
   * @param billingAddress - Billing address
   * @param paymentIntentId - Stripe payment intent ID
   * @returns Observable of the created order
   */
  createOrder(
    items: CartItem[],
    shippingAddress: Address,
    billingAddress: Address,
    paymentIntentId: string
  ): Observable<Order> {
    // Calculate order totals using domain functions
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const shippingCost = this.calculateShippingCost(subtotal);
    const tax = calculateTax(subtotal);
    const total = calculateOrderTotal(subtotal, shippingCost, tax);

    const order: Order = {
      items,
      shippingAddress,
      billingAddress,
      subtotal,
      shippingCost,
      tax,
      total,
      paymentMethod: 'card',
      paymentIntentId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Order>(this.apiUrl, order, { headers });
  }

  /**
   * Get order by ID
   * @param orderId - Order identifier
   * @returns Observable of the order
   */
  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  /**
   * Get all orders for the current user
   * @returns Observable of orders array
   */
  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user`);
  }

  /**
   * Update order status
   * @param orderId - Order identifier
   * @param status - New status
   * @returns Observable of the updated order
   */
  updateOrderStatus(orderId: string, status: Order['status']): Observable<Order> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<Order>(
      `${this.apiUrl}/${orderId}/status`,
      { status },
      { headers }
    );
  }

  /**
   * Calculate shipping cost based on order subtotal
   * Business rule: Free shipping for orders over $50, otherwise $5.99
   * @param subtotal - Order subtotal
   * @returns Shipping cost
   */
  private calculateShippingCost(subtotal: number): number {
    const FREE_SHIPPING_THRESHOLD = 50;
    const STANDARD_SHIPPING_COST = 5.99;

    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  }
}


