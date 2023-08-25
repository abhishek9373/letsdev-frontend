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
    // also save userDetails to the localstorage
    localStorage.setItem('name', this.user.name);
    localStorage.setItem('email', this.user.email);
    localStorage.setItem('gender', `${this.user.gender}`);
    localStorage.setItem('branch', this.user.branch);
    localStorage.setItem('userId', this.user._id);
  }

  getUser(){
    return this.user;
  }
}

