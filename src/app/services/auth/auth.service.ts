import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private baseservice: BaseService, private userService: UserService) { }

  login() {
    try {
      return this.baseservice.fetch({ method: "POST", url: "/auth/login", options: { body : { email : "abhishekgund500@gmail.com", password : "Abhibgund@500" }}})
        .pipe(
          map(response => {
            if (response.status === 200) {
              if (response.data) {
                // save authtoken to localstorage
                localStorage.setItem('authToken', `${response.data.data.authTOken}`);
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
