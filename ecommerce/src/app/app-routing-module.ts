import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Cart } from './components/cart/cart';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Checkout } from './components/checkout/checkout';
import { Blog } from './components/blog/blog';
import { Contactus } from './components/contactus/contactus';
import { Notfound } from './components/notfound/notfound';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'cart', component: Cart },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'checkout', component: Checkout },
  { path: 'blog', component: Blog },
  { path: 'contactus', component: Contactus },
  { path: '**', component: Notfound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
