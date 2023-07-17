import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Subject } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { Token } from 'src/app/models/tmplog.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private tokenModel!: Token;
  // private userModelSubject!: UserModel;

  constructor(private baseservice: BaseService) { }

  // update userModel
  // set(userModel: UserModel) {
  //   this.userModelSubject = userModel;
  // }
  get() {
    this.baseservice.fetch({ method: "GET", url: "/user", options: {} }).subscribe((data: any) => {
      if (data.data) {
        const user = new UserModel({ ...data.data });
        this.setTokenModel({_id: data.data._id, email: data.data.email})
      } else {
        alert("get user failed");
      }
    })
  }

  setTokenModel(token: Token) {
    this.tokenModel = token;
  }

  getTokenModel(){
    return this.tokenModel;
  }

}
