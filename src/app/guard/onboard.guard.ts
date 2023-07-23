import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { UserModel, UserService } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OnboardGuard implements CanActivate {
  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }
  canActivate(route: any, state: any): boolean {

    const user: UserModel = this.userService.getUser();
    if(user){
      if(user.name){
        this.router.navigate(['/posts']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/auth']);
    return false;

  }
}
