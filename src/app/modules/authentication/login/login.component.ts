import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    LoaderService.loader(false);
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/), Validators.required])
  })

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.invalid) {
      ToastService.toast("email and password reuired");
      return;
    }
    try {
      const data: any = { email: this.loginForm.value.email, password: this.loginForm.value.password };
      this.authService.login(data.email, data.password).subscribe(data => {
        if (data.data.accessToken) {
          this.router.navigate(['/posts']);
        } else {
          ToastService.toast("Something went wrong!")
        }
      })
    } catch (error: any) {
      ToastService.toast(error.message)
    }
  }

  // logIn(event: loginForm): number {
  //   const email: any = event.email;
  //   const password: any = event.password;

  //   if (email.length <= 3 || password.length <= 5) {
  //     alert('Please enter a valid email and password');
  //     return 0;
  //   }
  //   this.authService.login(email, password).subscribe(data => {
  //     if (data.data.accessToken) {
  //       this.router.navigate(['/auth/verifyemail']);
  //     } else {
  //       alert("login failed");
  //     }
  //   })
  //   return 1
  // }


}


interface loginForm {
  email: string,
  password: string
}