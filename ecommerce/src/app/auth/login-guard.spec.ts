/**
 * @file login-guard.spec.ts
 * @description Component for RainBow Toys Angular E-commerce Platform
 * @path src/app/auth
 * @author Your Name
 * @date 2025-11-20
 * @project RainBow Toys
 */


import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginGuard } from './login-guard';

describe('loginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
