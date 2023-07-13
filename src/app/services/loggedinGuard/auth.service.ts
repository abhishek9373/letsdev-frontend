import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as AuthenticationService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private IsLoggedIn = false;
  constructor(private router : Router, private authservice: AuthenticationService) {
    const authToken:string | null = localStorage.getItem('authToken');
    if(authToken){
      // authenticate token from backend
      this.authservice.verify().subscribe(res=>{
        this.IsLoggedIn = res;
      });
    }
  }

  login(): boolean {
    this.router.navigate(['auth']);
    return false;
  }

  logout(): void {
    this.IsLoggedIn = false;
  }

  public isLoggedIn(): boolean {
    // try login user using existing token
    return this.IsLoggedIn;
  }
}
