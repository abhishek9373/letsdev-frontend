import { Injectable, OnInit } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { UserService as UserModelService } from 'src/app/models/user.model';
import { onboard } from '../interfaces/common.interface';
import { ToastService } from './toast.service';
import { Inpute } from '../interfaces/fetch.inpute';
import { SocketConfigService } from './socket-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(private baseservice: BaseService, private userService: UserService, private userModelService: UserModelService, private socketConfigService: SocketConfigService) { }

  ngOnInit(): void { }

  login(email: string, password: string) {
    try {
      return this.baseservice.fetch({ method: "POST", url: "/auth/login", options: { body: { email, password } } })
        .pipe(
          tap(response => {
            if (response.data) {
              localStorage.setItem('authToken', `${response.data.accessToken}`);
              this.userService.get();
              this.socketConfigService.updateSocketConfig();
            };
            return false;
          }
          )
        );
    } catch (err) {
      throw (err);
    }
  }

  onboard(data: onboard) {
    try {
      return this.baseservice.fetch({ method: "PATCH", url: "/user", options: { body: { ...data } } })
        .pipe(
          tap(response => {
            if (response.data) {
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

  logout(): Observable<boolean> {
    try {
      const reqObj: Inpute = { method: "DELETE", url: "/user/logout", options: {} }
      return this.baseservice.fetch(reqObj).pipe(tap(data => {
        return data;
      }))
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error)
    }
  }


}

// interfaces
interface loginBody {
  deviceId: string,
  deviceOS: string,
  appVersion: string,
  name: string,
  email: string,
}