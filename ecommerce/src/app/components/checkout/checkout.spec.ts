/**
 * @file checkout.spec.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/checkout
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Checkout } from './checkout';

describe('Checkout', () => {
  let component: Checkout;
  let fixture: ComponentFixture<Checkout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Checkout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Checkout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
