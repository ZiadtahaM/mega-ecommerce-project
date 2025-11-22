/**
 * @file contactus.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/contactus
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { serve } from '../../services/serve';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contactus.html',
  styleUrl: './contactus.css'
})
export class Contactus {
  
  // Form data
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  subject = '';
  message = '';
  newsletter = false;
  
  // Loading state
  isSubmitting = false;

  constructor(
    public api: serve, 
    private router: Router
  ) {}

  ngOnInit() {
    // Check if user is logged in
    if (this.api.isAuthenticated()) {
      this.prefillUserData();
    }
  }

  /**
   * Prefill form with user data if logged in
   */
  private prefillUserData(): void {
    if (this.api.username) {
      // Split username if it contains both first and last name
      const nameParts = this.api.username.split(' ');
      this.firstName = nameParts[0] || this.api.username;
      this.lastName = nameParts.slice(1).join(' ') || '';
    }
    if (this.api.email) {
      this.email = this.api.email;
    }
  }

  /**
   * Submit contact form
   */
  submitContactForm(event: Event): void {
    event.preventDefault();
    
    if (this.isSubmitting) return; // Prevent double submission
    
    // Validate form
    const validation = this.validateForm();
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    this.isSubmitting = true;

    try {

      const contactData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone || null,
        subject: this.subject,
        message: this.message,
        newsletter: this.newsletter,
        userId: this.api.userid,
        timestamp: new Date().toISOString()
      };

      console.log('Contact form submitted:', contactData);

 
      setTimeout(() => {
        

        this.showSuccessMessage();
        this.resetForm();
        this.isSubmitting = false;
      }, 1000);

    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to send message. Please try again.');
      this.isSubmitting = false;
    }
  }

  /**
   * Validate contact form
   */
  private validateForm(): { isValid: boolean; message: string } {
    if (!this.firstName.trim()) {
      return { isValid: false, message: 'Please enter your first name' };
    }

    if (!this.lastName.trim()) {
      return { isValid: false, message: 'Please enter your last name' };
    }

    if (!this.isValidEmail(this.email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }

    if (!this.subject.trim()) {
      return { isValid: false, message: 'Please select a subject' };
    }

    if (!this.message.trim() || this.message.length < 10) {
      return { isValid: false, message: 'Please enter a message (minimum 10 characters)' };
    }

    return { isValid: true, message: '' };
  }

  /**
   * Check if email is valid
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Show success message
   */
  private showSuccessMessage(): void {
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  }

  /**
   * Reset form after submission
   */
  private resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.subject = '';
    this.message = '';
    this.newsletter = false;
  }

  /**
   * Subscribe to newsletter (from newsletter section)
   */
  subscribeNewsletter(event: Event): void {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    
    if (!emailInput.value) {
      alert('Please enter your email address');
      return;
    }

    if (!this.isValidEmail(emailInput.value)) {
      alert('Please enter a valid email address');
      return;
    }

    // Simulate newsletter subscription
    console.log('Newsletter subscription:', emailInput.value);
    alert('Successfully subscribed to our newsletter!');
    emailInput.value = '';
  }

  /**
   * Navigate to different sections
   */
  navigateToSection(section: string): void {
    switch (section) {
      case 'products':
        this.router.navigate(['/products']);
        break;
      case 'home':
        this.router.navigate(['/']);
        break;
      case 'cart':
        this.router.navigate(['/cart']);
        break;
      default:
        console.log('Navigate to:', section);
    }
  }

  /**
   * Get current year for footer
   */
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  /**
   * Social media links (placeholder methods)
   */
  openFacebook(): void {
 
    window.open('#', '_blank');
  }

  openInstagram(): void {
 
    window.open('#', '_blank');
  }

  openTwitter(): void {
   
    window.open('#', '_blank');
  }
}