import { Token as Authtoken } from "../interfaces/token";
export class Token {
  authToken : string;
  isOnboarded : boolean | false;

  constructor(token :Authtoken){
    this.authToken = token.authToken;
    this.isOnboarded = token.isOnboarded;
  }
}
