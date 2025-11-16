/**
 * Checkout Component
 * 
 * This component handles the checkout process including:
 * - Displaying cart items and order summary
 * - Collecting shipping and billing address information
 * - Processing payments through Stripe
 * - Creating orders after successful payment
 * 
 * Following clean architecture principles:
 * - Presentation layer: This component handles UI and user interactions
 * - Uses services (application layer) for business logic
 * - Uses domain models for data structures
 * 
 * @component Checkout
 */
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { Subscription, firstValueFrom } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../models/cart-item.model';
import { Address } from '../../models/address.model';
import { calculateOrderTotal, calculateTax } from '../../models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit, OnDestroy {
  // Form groups for shipping and billing addresses
  shippingForm!: FormGroup;
  billingForm!: FormGroup;
  paymentForm!: FormGroup;
  
  // Stripe related properties
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardElement: StripeCardElement | null = null;
  
  // Reference to the card element container in the template
  @ViewChild('cardElement', { static: false }) cardElementRef!: ElementRef;
  
  // Component state
  cartItems: CartItem[] = [];
  isLoading = false;
  isProcessingPayment = false;
  errorMessage = '';
  successMessage = '';
  useShippingAsBilling = true; // Default to true
  paymentMethod: 'card' | 'paypal' = 'card'; // Default payment method
  
  // Order summary calculations
  subtotal = 0;
  shippingCost = 0;
  tax = 0;
  total = 0;
  
  // Subscriptions to manage
  private subscriptions = new Subscription();
  
  // Stripe publishable key - should be moved to environment configuration
  // TODO: Replace with your actual Stripe publishable key from environment variables
  private readonly STRIPE_PUBLISHABLE_KEY = 'pk_test_51...'; // Replace with your Stripe publishable key

  // City and State dropdown options
  cities: string[] = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'San Francisco', 'Indianapolis', 'Columbus', 'Fort Worth', 'Charlotte',
    'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Detroit', 'Nashville'
  ];

  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.initializeForms();
  }

  /**
   * Initialize component and load cart data
   */
  ngOnInit(): void {
    this.loadCartData();
    // Initialize Stripe card element if card is the default payment method
    if (this.paymentMethod === 'card') {
      setTimeout(() => {
        this.initializeStripeCardElement();
      }, 200);
    }
  }

  /**
   * Cleanup subscriptions and Stripe elements
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (this.cardElement) {
      this.cardElement.destroy();
    }
  }

  /**
   * Initialize reactive forms for shipping, billing addresses, and payment
   */
  private initializeForms(): void {
    // Shipping address form with validation
    this.shippingForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-()]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      orderNotes: ['']
    });

    // Billing address form (can be same as shipping)
    this.billingForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-()]+$/)]],
      email: ['', [Validators.required, Validators.email]]
    });

    // Payment form
    this.paymentForm = this.fb.group({
      paymentMethod: ['card', [Validators.required]],
      cardNumber: [''],
      cardName: [''],
      cardExpiry: [''],
      cardCvc: ['']
    });

    // Set up conditional validation for card fields
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      this.paymentMethod = method;
      this.updateCardValidation();
    });

    // Disable billing form by default since useShippingAsBilling is true
    this.billingForm.disable();
  }

  /**
   * Update card field validation based on payment method
   */
  private updateCardValidation(): void {
    const cardNumber = this.paymentForm.get('cardNumber');
    const cardName = this.paymentForm.get('cardName');
    const cardExpiry = this.paymentForm.get('cardExpiry');
    const cardCvc = this.paymentForm.get('cardCvc');

    if (this.paymentMethod === 'card') {
      cardNumber?.setValidators([Validators.required, Validators.pattern(/^\d{13,19}$/)]);
      cardName?.setValidators([Validators.required, Validators.minLength(2)]);
      cardExpiry?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
      cardCvc?.setValidators([Validators.required, Validators.pattern(/^\d{3,4}$/)]);
    } else {
      cardNumber?.clearValidators();
      cardName?.clearValidators();
      cardExpiry?.clearValidators();
      cardCvc?.clearValidators();
    }

    cardNumber?.updateValueAndValidity();
    cardName?.updateValueAndValidity();
    cardExpiry?.updateValueAndValidity();
    cardCvc?.updateValueAndValidity();
  }

  /**
   * Load cart items and calculate order summary
   */
  private loadCartData(): void {
    this.cartItems = this.cartService.getCartItems();
    
    if (this.cartItems.length === 0) {
      // Show message instead of redirecting - allows viewing the page for testing
      this.errorMessage = 'Your cart is empty. Please add items to your cart before checkout.';
      this.subtotal = 0;
      this.shippingCost = 0;
      this.tax = 0;
      this.total = 0;
      return;
    }

    this.calculateOrderSummary();
    
    // Subscribe to cart changes
    const cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      if (items.length === 0) {
        this.errorMessage = 'Your cart is empty. Please add items to your cart before checkout.';
        this.subtotal = 0;
        this.shippingCost = 0;
        this.tax = 0;
        this.total = 0;
      } else {
        this.errorMessage = '';
        this.calculateOrderSummary();
      }
    });
    this.subscriptions.add(cartSubscription);
  }

  /**
   * Calculate order summary (subtotal, shipping, tax, total)
   */
  private calculateOrderSummary(): void {
    // Calculate subtotal from cart items
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    
    // Calculate shipping cost (free shipping over $50)
    const FREE_SHIPPING_THRESHOLD = 50;
    this.shippingCost = this.subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.99;
    
    // Calculate tax (8% tax rate)
    this.tax = calculateTax(this.subtotal, 0.08);
    
    // Calculate total
    this.total = calculateOrderTotal(this.subtotal, this.shippingCost, this.tax);
  }

  /**
   * Handle payment method change
   */
  onPaymentMethodChange(method: 'card' | 'paypal'): void {
    this.paymentMethod = method;
    
    if (method === 'card') {
      // Initialize Stripe card element when card payment is selected
      setTimeout(() => {
        this.initializeStripeCardElement();
      }, 100);
    } else {
      // Destroy card element when switching away from card
      if (this.cardElement) {
        this.cardElement.destroy();
        this.cardElement = null;
      }
    }
  }

  /**
   * Initialize Stripe card element (separate method for re-initialization)
   */
  private async initializeStripeCardElement(): Promise<void> {
    // Don't initialize if already exists
    if (this.cardElement) {
      return;
    }

    try {
      // Check if Stripe is loaded
      if (!this.stripe) {
        // Load Stripe if not already loaded
        if (!this.STRIPE_PUBLISHABLE_KEY || this.STRIPE_PUBLISHABLE_KEY.includes('...')) {
          console.warn('Stripe publishable key not configured.');
          return;
        }
        this.stripe = await loadStripe(this.STRIPE_PUBLISHABLE_KEY);
        if (!this.stripe) {
          throw new Error('Failed to load Stripe');
        }
        this.elements = this.stripe.elements();
      }

      // Create card element
      if (this.elements && this.cardElementRef && this.cardElementRef.nativeElement) {
        // Clear any existing content
        const element = this.cardElementRef.nativeElement;
        if (element) {
          element.innerHTML = '';
        }

        this.cardElement = this.elements.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
              iconColor: '#9e2146',
            },
          },
        });
        
        this.cardElement.mount(this.cardElementRef.nativeElement);
        
        // Listen for card element errors
        this.cardElement.on('change', (event) => {
          const cardErrors = document.getElementById('card-errors');
          if (event.error) {
            if (cardErrors) {
              cardErrors.textContent = event.error.message;
            }
          } else {
            if (cardErrors) {
              cardErrors.textContent = '';
            }
          }
        });
      }
    } catch (error: any) {
      console.error('Error initializing Stripe card element:', error);
    }
  }

  /**
   * Handle "Use same as shipping" checkbox
   */
  onUseSameAddressChange(event: Event): void {
    this.useShippingAsBilling = (event.target as HTMLInputElement).checked;
    
    if (this.useShippingAsBilling) {
      // Copy shipping address to billing address
      const shippingValue = this.shippingForm.value;
      this.billingForm.patchValue({
        firstName: shippingValue.firstName,
        lastName: shippingValue.lastName,
        streetAddress: shippingValue.streetAddress,
        city: shippingValue.city,
        state: shippingValue.state,
        postalCode: shippingValue.postalCode,
        phoneNumber: shippingValue.phoneNumber,
        email: shippingValue.email
      });
      this.billingForm.disable();
    } else {
      this.billingForm.enable();
    }
  }

  /**
   * Handle form submission and payment processing
   */
  async onSubmit(): Promise<void> {
    // Check if cart is empty
    if (this.cartItems.length === 0) {
      this.errorMessage = 'Your cart is empty. Please add items to your cart before checkout.';
      return;
    }

    // Validate forms
    if (this.shippingForm.invalid) {
      this.markFormGroupTouched(this.shippingForm);
      this.errorMessage = 'Please fill in all required shipping address fields correctly.';
      return;
    }

    // Validate billing form only if not using shipping address
    if (!this.useShippingAsBilling && this.billingForm.invalid) {
      this.markFormGroupTouched(this.billingForm);
      this.errorMessage = 'Please fill in all required billing address fields correctly.';
      return;
    }

    // Validate payment form
    if (this.paymentForm.invalid) {
      this.markFormGroupTouched(this.paymentForm);
      this.errorMessage = 'Please fill in all required payment fields correctly.';
      return;
    }

    // For credit card payment, validate Stripe is initialized
    if (this.paymentMethod === 'card') {
      if (!this.cardElement || !this.stripe) {
        this.errorMessage = 'Payment system not initialized. Please configure your Stripe publishable key and refresh the page.';
        return;
      }
    }

    this.isProcessingPayment = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      // Step 1: Create payment intent
      const amountInCents = Math.round(this.total * 100); // Convert to cents
      const paymentIntent = await firstValueFrom(
        this.paymentService.createPaymentIntent(amountInCents, 'usd')
      );

      if (!paymentIntent) {
        throw new Error('Failed to create payment intent');
      }

      // Step 2: Process payment based on method
      let paymentIntentId: string;
      let paymentSucceeded = false;

      if (this.paymentMethod === 'card') {
        // Confirm payment with Stripe for credit card
        const billingValue = this.useShippingAsBilling ? this.shippingForm.value : this.billingForm.value;
        const billingName = `${billingValue.firstName} ${billingValue.lastName}`;

        const { error: stripeError, paymentIntent: confirmedPayment } = await this.stripe!.confirmCardPayment(
          paymentIntent.clientSecret,
          {
            payment_method: {
              card: this.cardElement!,
              billing_details: {
                name: billingName,
                email: billingValue.email,
                phone: billingValue.phoneNumber,
                address: {
                  line1: billingValue.streetAddress,
                  city: billingValue.city,
                  state: billingValue.state,
                  postal_code: billingValue.postalCode,
                },
              },
            },
          }
        );

        if (stripeError) {
          throw new Error(stripeError.message);
        }

        if (confirmedPayment?.status !== 'succeeded') {
          throw new Error('Payment was not successful');
        }

        paymentIntentId = confirmedPayment.id;
        paymentSucceeded = true;
      } else {
        // PayPal payment - in production, you would integrate PayPal SDK here
        // Use payment intent ID from response, or extract from client secret, or use placeholder
        paymentIntentId = paymentIntent.paymentIntentId || 
                         paymentIntent.clientSecret.split('_secret_')[0] || 
                         'paypal_pending';
        paymentSucceeded = true; // Assuming PayPal payment succeeds (in production, check actual status)
      }

      // Step 3: Create order if payment succeeded
      if (paymentSucceeded) {
        const shippingValue = this.shippingForm.value;
        const billingValue = this.useShippingAsBilling ? this.shippingForm.value : this.billingForm.value;

        // Create address objects with fullName computed from firstName + lastName
        const shippingAddress: Address = {
          firstName: shippingValue.firstName,
          lastName: shippingValue.lastName,
          fullName: `${shippingValue.firstName} ${shippingValue.lastName}`,
          streetAddress: shippingValue.streetAddress,
          city: shippingValue.city,
          state: shippingValue.state,
          postalCode: shippingValue.postalCode,
          phoneNumber: shippingValue.phoneNumber,
          email: shippingValue.email
        };

        const billingAddress: Address = {
          firstName: billingValue.firstName,
          lastName: billingValue.lastName,
          fullName: `${billingValue.firstName} ${billingValue.lastName}`,
          streetAddress: billingValue.streetAddress,
          city: billingValue.city,
          state: billingValue.state,
          postalCode: billingValue.postalCode,
          phoneNumber: billingValue.phoneNumber,
          email: billingValue.email
        };

        const order = await firstValueFrom(
          this.orderService.createOrder(
            this.cartItems,
            shippingAddress,
            billingAddress,
            paymentIntentId
          )
        );

        if (order) {
          // Clear cart and redirect to success page
          this.cartService.clearCart();
          this.successMessage = 'Payment successful! Your order has been placed.';
          
          // Redirect to order confirmation page (you can create this later)
          setTimeout(() => {
            this.router.navigate(['/order-summary'], { 
              queryParams: { orderId: order.id } 
            });
          }, 2000);
        }
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      this.errorMessage = error.message || 'Payment failed. Please try again.';
    } finally {
      this.isProcessingPayment = false;
    }
  }

  /**
   * Mark all form fields as touched to show validation errors
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Get form control error message
   */
  getErrorMessage(controlName: string, form: FormGroup): string {
    const control = form.get(controlName);
    if (control?.hasError('required')) {
      return `${this.getFieldLabel(controlName)} is required`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('pattern')) {
      return `Please enter a valid ${this.getFieldLabel(controlName)}`;
    }
    if (control?.hasError('minlength')) {
      return `${this.getFieldLabel(controlName)} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    }
    return '';
  }

  /**
   * Get human-readable field label
   */
  private getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      fullName: 'Full name',
      streetAddress: 'Street address',
      city: 'City',
      state: 'State',
      postalCode: 'Postal code',
      country: 'Country',
      phoneNumber: 'Phone number',
      email: 'Email',
      cardNumber: 'Card number',
      cardName: 'Name on card',
      cardExpiry: 'Expiration date',
      cardCvc: 'Security code'
    };
    return labels[controlName] || controlName;
  }

  /**
   * Check if form control has error and is touched
   */
  hasError(controlName: string, form: FormGroup): boolean {
    const control = form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  /**
   * Format card expiry input (MM/YY)
   */
  formatCardExpiry(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.paymentForm.patchValue({ cardExpiry: value });
  }
}
