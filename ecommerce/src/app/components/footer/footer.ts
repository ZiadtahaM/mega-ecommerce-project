


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { serve } from '../../services/serve';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
constructor(
    public api: serve, 
    private router: Router
  ) {}
  navigateToSection(section: string): void {
    switch (section) {
      case 'track-order':
        this.router.navigate(['/track-order']);
        break;
      case 'terms':
        this.router.navigate(['/terms']);
        break;
      case 'wishlist':
        this.router.navigate(['/wishlist']);
        break;
      case 'feedback':
        this.router.navigate(['/feedback']);
        break;
      case 'login':
        this.router.navigate(['/login']);
        break;
      case 'contact':
        this.router.navigate(['/contact']);
        break;
      case 'faq':
        this.router.navigate(['/faq']);
        break;
      case 'privacy':
        this.router.navigate(['/privacy']);
        break;
      case 'shipping':
        this.router.navigate(['/shipping']);
        break;
      case 'returns':
        this.router.navigate(['/returns']);
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
   * Social media links
   */
  openFacebook(): void {

    window.open('https://facebook.com/rainbowtoys', '_blank');
  }

  openTwitter(): void {
 
    window.open('https://twitter.com/rainbowtoys', '_blank');
  }

  openInstagram(): void {
   
    window.open('https://instagram.com/rainbowtoys', '_blank');
  }

  openPinterest(): void {
   
    window.open('https://pinterest.com/rainbowtoys', '_blank');
  }

  /**
   * Quick contact actions
   */
  callCustomerService(): void {
    window.open('tel:+11234567890', '_self');
  }

  emailCustomerService(): void {
    window.open('mailto:info@rainbowtoys.com', '_self');
  }

  /**
   * Newsletter subscription (if needed in footer)
   */
  subscribeToNewsletter(event: Event): void {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    
    if (!emailInput.value) {
      alert('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      alert('Please enter a valid email address');
      return;
    }

    // Simulate newsletter subscription
    console.log('Footer newsletter subscription:', emailInput.value);
    alert('Successfully subscribed to our newsletter!');
    emailInput.value = '';
  }

  /**
   * Handle footer animations on load
   */
  ngOnInit(): void {
 
    this.animateFooterElements();
    
   
    this.startToyAnimations();
  }

  /**
   * Animate footer elements with staggered entrance
   */
  private animateFooterElements(): void {
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('animate-entrance');
      }, index * 200);
    });
  }

  /**
   * Start toy animations
   */
  private startToyAnimations(): void {
    // Add CSS classes for toy animations
    const toyElements = document.querySelectorAll('.toy-decorations > *');
    toyElements.forEach((element, index) => {
      // Elements already have CSS animations defined
      console.log(`Toy element ${index} animation started`);
    });
  }

  /**
   * Handle responsive adjustments
   */
  ngAfterViewInit(): void {
    this.handleResponsiveLayout();
    window.addEventListener('resize', () => this.handleResponsiveLayout());
  }

  /**
   * Handle responsive layout changes
   */
  private handleResponsiveLayout(): void {
    const width = window.innerWidth;
    const decorativeSection = document.querySelector('.decorative-section');
    
    if (width <= 768) {
      // Mobile layout adjustments
      if (decorativeSection) {
        decorativeSection.classList.add('mobile-layout');
      }
    } else {
      // Desktop layout
      if (decorativeSection) {
        decorativeSection.classList.remove('mobile-layout');
      }
    }
  }

  /**
   * Clean up event listeners
   */
  ngOnDestroy(): void {
    window.removeEventListener('resize', () => this.handleResponsiveLayout());
  }

  /**
   * Get footer statistics (for future use)
   */
  getFooterStats(): any {
    return {
      totalSections: 4,
      socialLinks: 4,
      quickLinks: 6,
      contactMethods: 2,
      workingHours: 'Mon-Fri 10am-6pm EST'
    };
  }

  /**
   * Check if business is currently open
   */
  isBusinessOpen(): boolean {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    
    // Monday to Friday: 10am - 6pm
    if (day >= 1 && day <= 5) {
      return hour >= 10 && hour < 18;
    }
    // Saturday: 11am - 4pm
    else if (day === 6) {
      return hour >= 11 && hour < 16;
    }
    // Sunday: Closed
    else {
      return false;
    }
  }

  /**
   * Get business status message
   */
  getBusinessStatus(): { status: string; message: string } {
    if (this.isBusinessOpen()) {
      return {
        status: 'open',
        message: 'We\'re currently open!'
      };
    } else {
      return {
        status: 'closed',
        message: 'We\'re currently closed. We\'ll be open tomorrow!'
      };
    }
  }

  /**
   * Handle quick action buttons
   */
  handleQuickAction(action: string): void {
    switch (action) {
      case 'call':
        this.callCustomerService();
        break;
      case 'email':
        this.emailCustomerService();
        break;
      case 'chat':
        // Future implementation for live chat
        alert('Live chat feature coming soon!');
        break;
      default:
        console.log('Quick action:', action);
    }
  }

  /**
   * Track footer interactions for analytics
   */
  trackFooterInteraction(action: string, section?: string): void {
    const data = {
      action,
      section,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
    
    console.log('Footer interaction tracked:', data);
    
    // In a real app, send to analytics service
    // analyticsService.track('footer_interaction', data);
  }

  /**
   * Accessibility methods
   */
  focusFooterLink(element: HTMLElement): void {
    element.focus();
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /**
   * Keyboard navigation for footer links
   */
  onFooterKeydown(event: KeyboardEvent, section: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.navigateToSection(section);
      this.trackFooterInteraction('navigation', section);
    }
  }

  /**
   * Handle footer visibility on scroll
   */
  onScroll(): void {
    const footer = document.querySelector('.custom-footer');
    if (footer) {
      const rect = footer.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight;
      
      if (isVisible) {
        footer.classList.add('footer-visible');
      }
    }
  }

  /**
   * Initialize footer visibility tracking
   */
  ngAfterContentInit(): void {
    // Add scroll listener for footer animations
    window.addEventListener('scroll', this.onScroll.bind(this));
  }
}
