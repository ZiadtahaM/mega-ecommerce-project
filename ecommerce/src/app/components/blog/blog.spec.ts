/**
 * @file blog.spec.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/components/blog
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog } from './blog';

describe('Blog', () => {
  let component: Blog;
  let fixture: ComponentFixture<Blog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Blog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
