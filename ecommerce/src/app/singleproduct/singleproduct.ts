import { Component } from '@angular/core';
import { serve } from '../services/serve';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-singleproduct',
  standalone: false,
  templateUrl: './singleproduct.html',
  styleUrl: './singleproduct.css'
})
export class Singleproduct {
  product: any = null;
  relatedProducts: any[] = [];
  loading = true;
  activeTab = 'description';
  selectedImage = '';
  quantity = 1; // This is just for the input display

  constructor(
    public api: serve, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
   
    if (!id) {
      this.loading = false;
      return;
    }

    this.api.getProduct(id).subscribe({
      next: (res) => {
        console.log('Product:', res);
        this.product = res;
        this.selectedImage = res.thumbnail;
        this.loading = false;
        this.loadRelatedProducts();
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.loading = false;
      }
    });
  }

  loadRelatedProducts(): void {
    this.api.getProductsByCategory(this.product.category).subscribe({
      next: (res) => {
        this.relatedProducts = res.products
          .filter((p: any) => p.id !== this.product.id)
          .slice(0, 4);
      },
      error: (err) => {
        console.error('Error loading related products:', err);
      }
    });
  }


  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
  
    for (let i = 0; i < this.quantity; i++) {
      this.api.addToCart(this.product);
    }
    alert(`Added ${this.quantity} ${this.product.title} to cart!`);
    this.quantity = 1; 
  }

  goToProduct(id: number) {
    this.router.navigate(['/product', id]).then(() => {
      window.scrollTo(0, 0);
      this.ngOnInit();
    });
  }

  getStarArray(): number[] {
    return [1, 2, 3, 4, 5];
  }
}
