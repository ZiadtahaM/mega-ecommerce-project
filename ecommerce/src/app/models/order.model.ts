/**
 * Order Model
 * 
 * Represents an order in the domain layer.
 * This model encapsulates order-related business logic.
 * 
 * @interface Order
 */
import { Address } from './address.model';
import { CartItem } from './cart-item.model';

export interface Order {
  /** Unique order identifier */
  id?: string;
  
  /** User identifier who placed the order */
  userId?: string;
  
  /** List of items in the order */
  items: CartItem[];
  
  /** Shipping address */
  shippingAddress: Address;
  
  /** Billing address (can be same as shipping) */
  billingAddress: Address;
  
  /** Subtotal amount (sum of all items) */
  subtotal: number;
  
  /** Shipping cost */
  shippingCost: number;
  
  /** Tax amount */
  tax: number;
  
  /** Total amount (subtotal + shipping + tax) */
  total: number;
  
  /** Payment method used */
  paymentMethod: 'card' | 'paypal' | 'cash';
  
  /** Stripe payment intent ID */
  paymentIntentId?: string;
  
  /** Order status */
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  
  /** Order creation timestamp */
  createdAt?: Date;
  
  /** Order last update timestamp */
  updatedAt?: Date;
}

/**
 * Calculates the total order amount
 * @param subtotal - Sum of all items
 * @param shippingCost - Shipping cost
 * @param tax - Tax amount
 * @returns The total amount
 */
export function calculateOrderTotal(
  subtotal: number,
  shippingCost: number,
  tax: number
): number {
  return subtotal + shippingCost + tax;
}

/**
 * Calculates tax based on subtotal and tax rate
 * @param subtotal - Order subtotal
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns The calculated tax amount
 */
export function calculateTax(subtotal: number, taxRate: number = 0.08): number {
  return Math.round(subtotal * taxRate * 100) / 100; // Round to 2 decimal places
}


