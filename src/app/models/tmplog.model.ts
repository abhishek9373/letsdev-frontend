import { User } from "../interfaces/user";
export class Token {
  _id : string;
  email : string;

  constructor(user: User){
    this._id = user._id;
    this.email = user.email;
  }
}
