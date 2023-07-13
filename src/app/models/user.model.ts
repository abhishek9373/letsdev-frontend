import { User } from "../interfaces/user";

export class UserModel {
  name: string;
  username: string;
  gender: number;
  branch: string;
  domains: [string]
  constructor(user: User) {
    this.name = user.name;
    this.username = user.username;
    this.gender = user.gender;
    this.branch = user.branch;
    this.domains = user.domains;
  }
}

