import { Injectable, OnInit } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { UserService as UserModelService } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(private baseservice: BaseService, private userService: UserService, private userModelService:UserModelService) { }

  ngOnInit(): void { }

  login(email: string, password: string) {
    try {
      return this.baseservice.fetch({ method: "POST", url: "/auth/login", options: { body: { email: "abhishekgund500@gmail.com", password: "Abhibgund@500" } } })
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
      return this.baseservice.fetch({ method: "POST", url: "/user/verify", options: {} })
        .pipe(
          map(response => {
            if (response.data) {
              this.userService.get();
              return response.data;
            };
            return false;
          })
        );

    } catch (err) {
      throw (err);
    }
  }

  logout() { }


}

// interfaces
interface loginBody {
  deviceId: string,
  deviceOS: string,
  appVersion: string,
  name: string,
  email: string,
}