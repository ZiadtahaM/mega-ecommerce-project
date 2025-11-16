/**
 * Cart Item Model
 * 
 * Represents an item in the shopping cart.
 * This model is part of the domain layer and contains business logic.
 * 
 * @interface CartItem
 */
export interface CartItem {
  /** Unique identifier for the cart item */
  id: string;
  
  /** Product identifier */
  productId: string;
  
  /** Product name */
  productName: string;
  
  /** Product image URL */
  productImage: string;
  
  /** Unit price of the product */
  price: number;
  
  /** Quantity of items */
  quantity: number;
  
  /** Calculated subtotal (price * quantity) */
  subtotal: number;
}

/**
 * Calculates the subtotal for a cart item
 * @param item - The cart item
 * @returns The calculated subtotal
 */
export function calculateCartItemSubtotal(item: CartItem): number {
  return item.price * item.quantity;
}


