import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('authToken');
    if(authToken){
      const authRequest = request.clone({
        setHeaders: {
          authorization : `Bearer ${authToken}`
        }
      });
      // create a middleware to accept usermodel and set to User
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
