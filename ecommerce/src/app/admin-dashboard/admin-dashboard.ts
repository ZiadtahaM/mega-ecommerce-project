/**
 * @file admin-dashboard.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/admin-dashboard
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { Component } from '@angular/core';
import { serve } from '../services/serve';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
products: any[] = [];
  
  totalProducts = 0;
  activeProducts = 0;
  inactiveProducts = 0;
  
  showAddForm = false;
  showEditForm = false;
  
  // NEW PRODUCT FORM DATA
  newProduct = {
    title: '',
    price: 0,
    brand: '',
    category: '',
    stock: 0,
    description: ''
  };
  
  // EDITING PRODUCT DATA (includes ID!)
  editingProduct: any = null;
  
  constructor(public api: serve) {
    this.getProducts();
  }
  
  getProducts() {
    this.api.getProducts().subscribe(res => {
      this.products = res.products;
      this.calculateStats();
    });
  }
  
  calculateStats() {
    this.totalProducts = this.products.length;
    this.activeProducts = 0;
    this.inactiveProducts = 0;
    
    for (let p of this.products) {
      if (p.stock > 0) {
        this.activeProducts++;
      } else {
        this.inactiveProducts++;
      }
    }
  }
  
  // OPEN ADD FORM
  openAddForm() {
    this.showAddForm = true;
    this.showEditForm = false;
  }
  
  // CLOSE ADD FORM
  closeAddForm() {
    this.showAddForm = false;
    // Reset form
    this.newProduct = {
      title: '',
      price: 0,
      brand: '',
      category: '',
      stock: 0,
      description: ''
    };
  }
  
  // ADD PRODUCT
  addProduct() {
    if (!this.newProduct.title || this.newProduct.price <= 0) {
      alert('Fill title and price!');
      return;
    }
    
    this.api.addProduct(this.newProduct).subscribe({
      next: (res) => {
        console.log('Added:', res);
        
        // Add to list with new ID from API
        const added = {
          id: res.id,
          title: this.newProduct.title,
          price: this.newProduct.price,
          brand: this.newProduct.brand,
          category: this.newProduct.category,
          stock: this.newProduct.stock,
          description: this.newProduct.description,
          thumbnail: 'https://via.placeholder.com/150'
        };
        
        this.products.unshift(added);
        this.calculateStats();
        this.closeAddForm();
        alert('Product added!');
      },
      error: (err) => {
        console.error(err);
        alert('Error adding product');
      }
    });
  }
  
  // OPEN EDIT FORM - THIS SAVES THE ID!
  openEditForm(product: any) {
    // Copy entire product object INCLUDING ID
    this.editingProduct = { ...product };
    console.log('Editing product with ID:', this.editingProduct.id);
    
    this.showEditForm = true;
    this.showAddForm = false;
  }
  
  // CLOSE EDIT FORM
  closeEditForm() {
    this.showEditForm = false;
    this.editingProduct = null;
  }
  
  // UPDATE PRODUCT - USES THE SAVED ID!
  updateProduct() {
  if (!this.editingProduct.title || this.editingProduct.price <= 0) {
    alert('Fill title and price!');
    return;
  }
  
  console.log('Updating product ID:', this.editingProduct.id);
  console.log('Data before sending:', this.editingProduct);
  
  this.api.updateProduct(this.editingProduct.id, this.editingProduct).subscribe({
    next: (res) => {
      console.log('✅ Update SUCCESS:', res);
      
      // Update in local array
      const index = this.products.findIndex(p => p.id === this.editingProduct.id);
      if (index !== -1) {
        // Keep thumbnail and other fields, update only what changed
        this.products[index] = {
          ...this.products[index],
          title: this.editingProduct.title,
          price: this.editingProduct.price,
          brand: this.editingProduct.brand,
          category: this.editingProduct.category,
          stock: this.editingProduct.stock,
          description: this.editingProduct.description
        };
      }
      
      this.calculateStats();
      this.closeEditForm();
      alert('Product updated!');
    },
    error: (err) => {
      console.error('❌ Update FAILED:', err);
      console.error('Error details:', err.error);
      alert('Error: ' + (err.message || 'Update failed'));
    }
  });
}
  // DELETE PRODUCT
  deleteProduct(id: number) {
    if (!confirm('Delete this product?')) {
      return;
    }
    
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        console.log('Deleted:', res);
        this.products = this.products.filter(p => p.id !== id);
        this.calculateStats();
        alert('Product deleted!');
      },
      error: (err) => {
        console.error(err);
        alert('Error deleting product');
      }
    });
  }
  
 
  
  
}
