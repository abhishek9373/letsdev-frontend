import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Token } from '../models/token.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OnBoardGuard implements CanActivate {

  token: Token;
  constructor(private userService: UserService, private router: Router) {
    this.token = this.userService.getTokenModel();
  }

  canActivate(route: any, state: any): boolean {
    if (this.token) {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }
}