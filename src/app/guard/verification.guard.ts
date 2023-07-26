import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../models/user.model';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: any, state: any): boolean {

    const user: User = this.userService.getUser();
    if(user?.isVerified){
      return false;
    }
    return true;
  }
}

