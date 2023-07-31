import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  async canActivate(route: any, state: any): Promise<boolean> {
    const user: User = await this.userService.getOnly().toPromise();
    if(user?.isVerified){
      this.router.navigate(['/auth/onboard']);
      return false;
    }
    return true;
  }
}

