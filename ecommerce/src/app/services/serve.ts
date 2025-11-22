import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class serve {
role: 'admin' | 'user' = 'user';

isAdmin(): boolean {
  return this.role === 'admin';
}
   public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
  
    return !!token;
  }
  // User data
  userid: any = localStorage.getItem('userid');
  username: string | null = null;
  email: string | null = null;
  password: string | null = null;
  confirmPassword: string | null = null;
  isLogin = localStorage.getItem('token') ? true : false;
  
  // Cart
  cart: any[] = [];
  
  constructor(public http: HttpClient) {
    // Load user data on start
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.username = userData.firstName || userData.username;
      this.email = userData.email;
    }
    
    // Load cart on start
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
     this.role = (localStorage.getItem('role') as any) || 'user';

  }
  
  // ===== AUTH =====
  
  register(body: any): Observable<any> {
  return this.http.post('https://full.faedg.com/public/api/client/customer_register', body)
    .pipe(
      tap((res: any) => {
        console.log('Register API Response:', res);
        
        // Handle different response structures
        let token, userData;
        
        if (res.status === "true" && res.data) {

          token = res.data.token;
          userData = res.data;
        } else if (res.token) {
          // Direct token in response: { token, id, first_name }
          token = res.token;
          userData = res;
        }
        
        if (token) {
          // Save to localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('userid', userData.id);
          
          // Update service properties
          this.userid = userData.id;
          this.username = userData.first_name || userData.firstName;
          this.email = userData.email;
          this.isLogin = true;
            let role = (this.username === 'emilys') ? 'admin' : 'user';
      localStorage.setItem('role', role);
        }
      })
    );
    
}
// Add new product

addProduct(product: any): Observable<any> {
  console.log('Service: Adding product', product);
  return this.http.post('https://dummyjson.com/products/add', product, {
    headers: { 'Content-Type': 'application/json' }
  });
}

updateProduct(id: number, product: any): Observable<any> {
  console.log('Service: Updating product', id, product);
  
  // Only send fields that DummyJSON accepts
  const updateData: any = {};
  
  if (product.title) updateData.title = product.title;
  if (product.price) updateData.price = product.price;
  if (product.stock !== undefined) updateData.stock = product.stock;
  if (product.brand) updateData.brand = product.brand;
  if (product.category) updateData.category = product.category;
  if (product.description) updateData.description = product.description;
  
  console.log('Sending to API:', updateData);
  
  return this.http.put(`https://dummyjson.com/products/${id}`, updateData);
}

deleteProduct(id: number): Observable<any> {
  console.log('Service: Deleting product', id);
  return this.http.delete(`https://dummyjson.com/products/${id}`);
}
  
  login(username: string, password: string): Observable<any> {
    return this.http.post('https://dummyjson.com/auth/login', {
      username: username,
      password: password
    }).pipe(tap((res: any) => {
      const token = res.accessToken || res.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(res));
      localStorage.setItem('userid', res.id);
      this.userid = res.id;
      this.username = res.firstName || res.username;
      this.email = res.email;
      this.isLogin = true;
      this.role = (username === 'emilys') ? 'admin' : 'user'; // Make emilys admin
    localStorage.setItem('role', this.role);
    }));
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userid');
     localStorage.removeItem('role'); 
    this.userid = null;
    this.username = null;
    this.email = null;
    this.isLogin = false;
    this.cart = [];
     this.role = 'user'; 
     
  }
  
  updateProfile(userid: any, updatedData: any): Observable<any> {
    return this.http.put(`https://full.faedg.com/public/api/client/profile/${userid}`, updatedData);
  }
  
  // ===== PRODUCTS =====
  
  getProducts(): Observable<any> {
    return this.http.get('https://dummyjson.com/products');
  }
  
  getProduct(id: any): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/${id}`);
  }
  
  // ===== CART =====
  
  addToCart(product: any) {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  
  
  removeFromCart(productId: any) {
    this.cart = this.cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  
  getCartTotal() {
    let total = 0;
    for (let item of this.cart) {
      total += item.price * item.quantity;
    }
    return total;
  }
  getProductsByCategory(category: string): Observable<any> {
  return this.http.get(`https://dummyjson.com/products/category/${category}`);
}
}
