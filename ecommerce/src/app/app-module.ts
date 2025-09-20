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
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Checkout } from './components/checkout/checkout';
import { Notfound } from './components/notfound/notfound';
import { Blog } from './components/blog/blog';
import { Contactus } from './components/contactus/contactus';

@NgModule({
  declarations: [
    App,
    Home,
    Products,
    Cart,
    NavAuth,
    NavBlank,
    Footer,
    Login,
    Dashboard,
    Checkout,
    Notfound,
    Blog,
    Contactus
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule 
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
