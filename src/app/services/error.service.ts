import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  private errorModelSubject = new Subject<string>();
  errorModel$ = this.errorModelSubject.asObservable();

  setError(code:number, message:string){
    switch (code) {
      case 400:
        this.errorModelSubject.next(message || "Bad parameter error");
        break;

      case 401:
        this.errorModelSubject.next("You are not authenticated" || message);
        break;

      case 500:
        this.errorModelSubject.next("Internal server Error" || message);
        break;

      case 502:
        this.errorModelSubject.next("You are not authenticated" || message);
        break;

      case 200:
        this.errorModelSubject.next("success" || message);
        break;

      case 201:
        this.errorModelSubject.next("created" || message);
        break;

      default:
        this.errorModelSubject.next("unknown error occured" || message);
        break;
    }
  }
}
