import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { serve } from '../services/serve';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
 const api = inject(serve)
  if (req.url.includes('/login')) {
      
      return next(req);
    }
  if (req.url.includes('dummyjson.com/products')) {
    return next(req);
  }
  let token = localStorage.getItem('token')
  if(localStorage.getItem('token')){
req = req.clone(
  {headers : req.headers.set("Authorization" , `Bearer ${token}` )}
)
  }
   console.log(token);
  return next(req)
};
