import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserModel } from 'src/app/models/user.model';
import { UserService as userService } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private baseservice: BaseService, private userService: userService) { }

  get() {
    this.baseservice.getUser({ method: "GET", url: "/user", options: {} }).subscribe((data: UserModel) => {
      if (data) {
        this.userService.setUser(data);
      } else {
        alert("error in fetching user details");
      }
    })
  }
}
