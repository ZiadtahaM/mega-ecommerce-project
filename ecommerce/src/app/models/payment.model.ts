/**
 * Payment Model
 * 
 * Represents payment information in the domain layer.
 * This model is used for processing payments through Stripe.
 * 
 * @interface PaymentIntent
 */
export interface PaymentIntent {
  /** Stripe payment intent client secret */
  clientSecret: string;
  
  /** Stripe payment intent ID */
  paymentIntentId?: string;
  
  /** Payment amount in cents */
  amount: number;
  
  /** Currency code (e.g., 'usd', 'eur') */
  currency: string;
  
  /** Order ID associated with this payment */
  orderId?: string;
}

/**
 * Payment Method Model
 * 
 * Represents the payment method details.
 */
export interface PaymentMethod {
  /** Payment method type */
  type: 'card';
  
  /** Card details */
  card?: {
    /** Last 4 digits of the card */
    last4: string;
    
    /** Card brand (visa, mastercard, etc.) */
    brand: string;
    
    /** Expiration month */
    expMonth: number;
    
    /** Expiration year */
    expYear: number;
  };
}

/**
 * Payment Result Model
 * 
 * Represents the result of a payment attempt.
 */
export interface PaymentResult {
  /** Whether the payment was successful */
  success: boolean;
  
  /** Payment intent ID if successful */
  paymentIntentId?: string;
  
  /** Error message if payment failed */
  error?: string;
  
  /** Order ID if payment was successful */
  orderId?: string;
}


