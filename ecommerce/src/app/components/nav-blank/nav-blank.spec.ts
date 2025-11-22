/**
 * @file nav-blank.spec.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/nav-blank
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBlank } from './nav-blank';

describe('NavBlank', () => {
  let component: NavBlank;
  let fixture: ComponentFixture<NavBlank>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBlank]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBlank);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
