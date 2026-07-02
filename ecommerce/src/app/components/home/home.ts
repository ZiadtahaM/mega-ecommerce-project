/**
 * @file home.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/home
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
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  productss:any[]=[]
constructor(public api:serve ,public router:Router, private toastr: ToastrService){}
ngOnInit(): void {
  this.api.getProducts().subscribe(res => {
    console.log(res);
    this.productss=res.products
  })
  
}
 subscribeNewsletter(event: Event) {
    event.preventDefault();
    this.toastr.success('Subscribed successfully!');
  }
 addTocCart(item: any) {
    console.log('Adding to cart:', item);
    this.api.addToCart(item);
    this.toastr.success(`${item.title} added to cart!`);
  }
  veiwproduct(id: any) {
    this.router.navigate([`/product/${id}`]);
  }
  
}

