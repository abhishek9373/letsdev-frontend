import { User } from "../interfaces/user";

export class UserModel {
  name: string;
  gender: number;
  branch!: string;
  _id!: string;
  email!: string;
  constructor(user: User) {
    this.email = user.email;
    this._id = user._id;
    this.name = user.name;
    this.gender = user.gender;
    this.branch = user.branch;
  }
}

