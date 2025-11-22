/**
 * @file contactus.spec.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/contactus
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contactus } from './contactus';

describe('Contactus', () => {
  let component: Contactus;
  let fixture: ComponentFixture<Contactus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Contactus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contactus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
