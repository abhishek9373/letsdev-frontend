import { Injectable, OnInit } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(private baseservice: BaseService, private userService: UserService) { }

  ngOnInit(): void {
    console.log(navigator.mediaDevices.getUserMedia);
  }

  login(email: string, password: string) {
    try {

      return this.baseservice.fetch({ method: "POST", url: "/auth/login", options: { body : { email : "abhishekgund500@gmail.com", password : "Abhibgund@500" }}})
        .pipe(
          tap(response => {
              if (response.data) {
                localStorage.setItem('authToken', `${response.data.accessToken}`);
                this.userService.get();
              };
              return false;
            }
          )
        );
    } catch (err) {
      throw (err);
    }
  }

  verify(): Observable<boolean> {
    try {
      return this.baseservice.fetch({ method: "POST", url: "/auth/verify", options: {} })
        .pipe(
          map(response => {
            if (response.status === 200) {
              if (response.data) {
                this.userService.get();
                return response.data.data;
              };
              return false;
            }
          })
        );
    } catch (err) {
      throw (err);
    }
  }

  logout() {

  }


}

// interfaces
interface loginBody{
  deviceId: string,
  deviceOS: string,
  appVersion: string,
  name: string,
  email: string,
}