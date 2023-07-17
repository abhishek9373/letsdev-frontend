import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router){}

  logIn(event: loginForm): number{
    const email: any = event.email;
    const password: any = event.password;

    if(email.length <= 3 || password.length <= 5){
      alert('Please enter a valid email and password');
      return 0;
    }
    this.authService.login(email, password).subscribe(data=>{
      if(data.data.accessToken){
        this.router.navigate(['/auth/onboard']);
      }else{
        alert("login failed");
      }
    })
    return 1

  }


}


interface loginForm{
  email: string,
  password: string
}