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

    const omitTokenAttachment = request.url.includes('/storage.googleapis.com');

    // If the token attachment is not needed, pass the original request without changes.
    if (omitTokenAttachment) {
      return next.handle(request);
    }

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
