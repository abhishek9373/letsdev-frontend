import { Injectable } from "@angular/core";

export interface UserModel {
  isVerified: boolean;
  name: string;
  gender: number;
  branch: string;
  _id: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user!: UserModel;

  constructor() { }

  setUser(user: UserModel){
    this.user = user;
  }

  getUser(){
    return this.user;
  }
}

