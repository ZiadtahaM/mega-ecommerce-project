/**
 * Address Model
 * 
 * Represents a shipping/billing address in the domain layer.
 * This is a pure domain model with no framework dependencies.
 * 
 * @interface Address
 */
export interface Address {
  /** Unique identifier for the address */
  id?: string;
  
  /** First name of the recipient */
  firstName: string;
  
  /** Last name of the recipient */
  lastName: string;
  
  /** Full name of the recipient (computed from firstName + lastName) */
  fullName?: string;
  
  /** Street address line 1 */
  streetAddress: string;
  
  /** Street address line 2 (optional) */
  streetAddress2?: string;
  
  /** City name */
  city: string;
  
  /** State or province */
  state: string;
  
  /** Postal/ZIP code */
  postalCode: string;
  
  /** Country name */
  country?: string;
  
  /** Phone number for delivery contact */
  phoneNumber: string;
  
  /** Email address for order updates */
  email: string;
  
  /** Whether this is the default shipping address */
  isDefault?: boolean;
}


