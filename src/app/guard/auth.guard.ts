import { CanActivate } from '@angular/router';
import { AuthService } from '../services/loggedinGuard/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route:any, state:any): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      return true; // User is logged in, allow access to the route
    } else {
      // check whether landing page shown
      this.authService.login();
      return false;
    }
  }
}
