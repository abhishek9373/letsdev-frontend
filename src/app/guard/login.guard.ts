import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { UserService } from '../models/user.model';
import { UserService as UserModelService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private userService: UserService, private router: Router, private userModelService: UserModelService) { }
  async canActivate(route: any, state: any): Promise<boolean> {
    const token: string | null = localStorage.getItem('authToken');
    if (!token) {
      return true;
    }
    this.router.navigate(['/posts']);
    return false;
  }
}