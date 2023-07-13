import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error/error.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient, private errorService:ErrorService) { }

  private serverUrl:string = "http://localhost:3015";
  fetch(req:Inpute): Observable<any>{
    const url: string = this.serverUrl+req.url;
    try{
      return this.http.request(req.method, url, req.options).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status >= 400 && error.status < 600) {
            throw new Error(`HTTP Error: ${error.status}`);
          } else {
            return throwError(error);
          }
        })
      );
    }catch(err){
      throw(err);
    }
  }
}

interface Inpute {
  method : string,
  url : string,
  options : object
}
