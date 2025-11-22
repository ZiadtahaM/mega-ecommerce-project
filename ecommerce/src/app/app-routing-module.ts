/**
 * @file app-routing-module.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Checkout } from './components/checkout/checkout';
import { Blog } from './components/blog/blog';
import { Contactus } from './components/contactus/contactus';
import { Dashboard } from './components/dashboard/dashboard';
import { Notfound } from './components/notfound/notfound';
import { Cart } from './components/cart/cart';
import { register } from './components/register/register';  
import { Singleproduct } from './singleproduct/singleproduct';
import { Login } from './login/login';
import { LoginGuard } from './auth/login-guard';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { adminGuardGuard } from './admin-guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'login', component: Login, canActivate: [LoginGuard] },  
  { path: 'register', component: register, canActivate: [LoginGuard] },  
  { path: 'home', component: Home },
  { path: 'dash', component: AdminDashboard, canActivate: [adminGuardGuard] }, 
  { path: 'products', component: Products },
  { path: 'product/:id', component: Singleproduct },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout }, 
  { path: 'blog', component: Blog },
  { path: 'contact', component: Contactus },
  { path: 'dashboard', component: Dashboard },
  { path: '**', component: Notfound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
