/**
 * @file products.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/products
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { Component, OnInit } from '@angular/core';
import { serve } from '../../services/serve';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  productss: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  selectedPriceRange: string = 'All';
  priceRanges: string[] = ['All', 'Under $25', '$25-$50', 'Over $50'];

  constructor(public api: serve, public router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Load products from your serve service API
    this.api.getProducts().subscribe({
      next: (res: any) => {
        console.log('Products loaded:', res);
        this.productss = res.products || res;
        this.filteredProducts = [...this.productss];
        
        // Extract unique categories from API data
        const uniqueCategories = [...new Set(this.productss.map((p: any) => p.category))];
        this.categories = ['All', ...uniqueCategories];
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.productss = [];
        this.filteredProducts = [];
        this.categories = ['All'];
      }
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  filterByPriceRange(range: string) {
    this.selectedPriceRange = range;
    this.applyFilters();
  }

  private applyFilters() {
    let filtered = [...this.productss];

    // Filter by category
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Filter by price range
    if (this.selectedPriceRange !== 'All') {
      switch (this.selectedPriceRange) {
        case 'Under $25':
          filtered = filtered.filter(product => product.price < 25);
          break;
        case '$25-$50':
          filtered = filtered.filter(product => product.price >= 25 && product.price <= 50);
          break;
        case 'Over $50':
          filtered = filtered.filter(product => product.price > 50);
          break;
      }
    }

    this.filteredProducts = filtered;
  }

  addTocCart(item: any) {
    console.log('Adding to cart:', item);
    this.api.addToCart(item);
    this.toastr.success(`${item.title} added to cart!`);
  }

  veiwproduct(id: any) {
    this.router.navigate([`/product/${id}`]);
  }

  getPriceForDisplay(item: any): number {
    if (item.discountPercentage > 0) {
      return item.price * (1 - item.discountPercentage / 100);
    }
    return item.price;
  }
}
