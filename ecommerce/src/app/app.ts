/**
 * @file app.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavAuth } from './components/nav-auth/nav-auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',


})
export class App {
  protected readonly title = signal('ecommerce');
}
