/**/


import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { serve } from './services/serve';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const api = inject(serve);
  const router = inject(Router);
  

  if (api.isAuthenticated() && api.isAdmin()) {
    return true; 
  }
  

  alert('Access denied! Admin only.');
  return router.createUrlTree(['/home']);
};
