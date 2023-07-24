import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { UserModel, UserService } from '../models/user.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }
  canActivate(route: any, state: any): boolean {
    // check conditionaly
    // check usermodel set or not
    if (this.userService.getUser()) {
      const user: UserModel = this.userService.getUser();
      if (user?.name) {
        // if user's name present in usermodel then user is inboarded move allow routing
        return true;
      }
      this.router.navigate(['/auth/onboard']);
      // otherwise show onboarding page
      return false;
    }
    // usemodel is not present check token
    const token: string | null = localStorage.getItem('authToken');
    let isOnboarded = true;

    if (token) {
      // if token is present then verify it
      const res: Observable<boolean> = this.authService.verify();
      res.subscribe(r => {
        if (r) {
          const user: UserModel = this.userService.getUser();
          // if token is valid then check if user is onboarded;
          if (!user?.name) { isOnboarded = false };
          return true;
        };
        return false;
      })
    }
    else {
      // if token is not present navigate to login page
      this.router.navigate(['/auth']);
      return false;
    }

    if (!isOnboarded) {
      // check isOnboarded condition
      this.router.navigate(['/auth/onboard']);
      return false;
    } else {
      // this.router.navigate(['/posts']);
      return true;
    }
  }

  canActivateChild(route: any, state: any): boolean {
    // check conditionaly
    if (this.userService.getUser()) {
      const user: UserModel = this.userService.getUser();
      if (user?.name) {
        // if user's name present in usermodel then user is inboarded move allow routing
        return true;
      }
      this.router.navigate(['/auth/onboard']);
      // otherwise show onboarding page
      return false;
    }
    // usemodel is not present check token
    const token: string | null = localStorage.getItem('authToken');
    let isOnboarded = true;

    if (token) {
      // if token is present then verify it
      const res: Observable<boolean> = this.authService.verify();
      res.subscribe(r => {
        if (r) {
          const user: UserModel = this.userService.getUser();
          // if token is valid then check if user is onboarded;
          if (!user?.name) { isOnboarded = false };
          return true;
        };
        return false;
      })
    }
    else {
      // if token is not present navigate to login page
      this.router.navigate(['/auth']);
      return false;
    }

    if (!isOnboarded) {
      // check isOnboarded condition
      this.router.navigate(['/auth/onboard']);
      return false;
    } else {
      // this.router.navigate(['/posts']);
      return true;
    }
  }

}
