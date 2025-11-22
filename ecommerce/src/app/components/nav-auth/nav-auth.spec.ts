/**
 * @file nav-auth.spec.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/nav-auth
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAuth } from './nav-auth';

describe('NavAuth', () => {
  let component: NavAuth;
  let fixture: ComponentFixture<NavAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavAuth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAuth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
