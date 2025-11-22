/**
 * @file notfound.spec.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/notfound
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Notfound } from './notfound';

describe('Notfound', () => {
  let component: Notfound;
  let fixture: ComponentFixture<Notfound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Notfound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Notfound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
