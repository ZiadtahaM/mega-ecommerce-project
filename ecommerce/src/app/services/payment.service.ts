/**
 * Payment Service
 * 
 * Service responsible for payment processing operations.
 * This service handles Stripe payment integration and payment intent creation.
 * 
 * Following clean architecture principles:
 * - This is part of the application layer
 * - It uses domain models (PaymentIntent, PaymentResult)
 * - It communicates with the infrastructure layer (HTTP client) for API calls
 * - It abstracts payment processing logic from components
 * 
 * @class PaymentService
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PaymentIntent, PaymentResult } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // API base URL - should be moved to environment configuration
  private readonly apiUrl = 'http://localhost:3000/api/payments';

  constructor(private http: HttpClient) {}

  /**
   * Create a payment intent with Stripe
   * This method calls the backend API to create a payment intent
   * 
   * @param amount - Payment amount in cents
   * @param currency - Currency code (default: 'usd')
   * @param orderId - Optional order ID to associate with payment
   * @returns Observable of PaymentIntent containing client secret
   */
  createPaymentIntent(
    amount: number,
    currency: string = 'usd',
    orderId?: string
  ): Observable<PaymentIntent> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { amount, currency, orderId };

    return this.http.post<PaymentIntent>(`${this.apiUrl}/create-intent`, body, { headers })
      .pipe(
        catchError(error => {
          console.error('Error creating payment intent:', error);
          return throwError(() => new Error('Failed to create payment intent. Please try again.'));
        })
      );
  }

  /**
   * Confirm payment with Stripe
   * This method confirms the payment after the user submits their card details
   * 
   * @param clientSecret - Payment intent client secret from Stripe
   * @param paymentMethodId - Payment method ID from Stripe Elements
   * @returns Observable of PaymentResult
   */
  confirmPayment(
    clientSecret: string,
    paymentMethodId: string
  ): Observable<PaymentResult> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { clientSecret, paymentMethodId };

    return this.http.post<PaymentResult>(`${this.apiUrl}/confirm`, body, { headers })
      .pipe(
        map(result => result),
        catchError(error => {
          console.error('Error confirming payment:', error);
          return throwError(() => new Error(
            error.error?.message || 'Payment failed. Please check your card details and try again.'
          ));
        })
      );
  }

  /**
   * Get payment status
   * @param paymentIntentId - Stripe payment intent ID
   * @returns Observable of payment status
   */
  getPaymentStatus(paymentIntentId: string): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.apiUrl}/status/${paymentIntentId}`)
      .pipe(
        catchError(error => {
          console.error('Error getting payment status:', error);
          return throwError(() => new Error('Failed to retrieve payment status.'));
        })
      );
  }
}


