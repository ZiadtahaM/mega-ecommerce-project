/**
 * @file app-module.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Cart } from './components/cart/cart';
import { NavAuth } from './components/nav-auth/nav-auth';
import { NavBlank } from './components/nav-blank/nav-blank';
import { Footer } from './components/footer/footer';
import { register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';   
import { Checkout } from './components/checkout/checkout';
import { Notfound } from './components/notfound/notfound';
import { Blog } from './components/blog/blog';
import { Contactus } from './components/contactus/contactus';
import {  HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptorInterceptor } from './inter/interceptor-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Singleproduct } from './singleproduct/singleproduct';
import { Login } from './login/login';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';

@NgModule({
  declarations: [
    App,
    Home,
    Products,
    Cart,
    NavAuth,
     
    NavBlank,
    Footer,
    register,
    Dashboard,
    Checkout,
    Notfound,
    Blog,
    Contactus,
    Singleproduct,
    Login,
    AdminDashboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule 
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),FormsModule,provideHttpClient(withInterceptors([interceptorInterceptor])),HttpClientModule,BrowserAnimationsModule, 
  ],
  bootstrap: [App]
})
export class AppModule { }
