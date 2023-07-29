import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { UserModel, UserService } from '../models/user.model';
import { UserService as UserModelService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Observable, catchError, map, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class OnboardGuard implements CanActivate {
  constructor(private authService: AuthService, private userService: UserService, private router: Router, private userModelService: UserModelService) { }
  canActivate(route: any, state: any): Observable<boolean> {
    return this.userModelService.getOnly().pipe(
      map((user: User) => {
        if (user && user.name) {
          this.router.navigate(['/posts']);
          return false;
        } else {
          if(user?.isVerified){
            return true;
          }
          this.router.navigate(['/auth/verifyemail']);
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error fetching user details:', error);
        this.router.navigate(['/auth']);
        return of(false);
      })
    );
  }
}
