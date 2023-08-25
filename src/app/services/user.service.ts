import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserModel } from 'src/app/models/user.model';
import { UserService as userService } from 'src/app/models/user.model';
import { Observable } from 'rxjs'
import { UpdateUser } from '../interfaces/Comment.interface';


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

  // get user by id
  getById(userId: string): Observable<any> {
    return this.baseservice.getUser({ method: "GET", url: `/user?userId=${userId}`, options: {} })
  }

  getOnly(): Observable<any> {
    return this.baseservice.getUser({ method: "GET", url: "/user", options: {} });
  }

  update(data: UpdateUser): Observable<any>{
    return this.baseservice.fetch({ method: "PATCH", url: "/user", options: { body: { ...data } }});
  }

}
