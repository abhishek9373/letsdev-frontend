import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { Utility } from '../models/error.model';
import { Inpute } from '../interfaces/fetch.inpute';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient, private router: Router) { }

  private serverUrl: string = "https://devbuilder.tech/services";

  // main api service
  fetch(req: Inpute): Observable<any> {
    const url: string = this.serverUrl + req.url;
    return this.http.request(req.method, url, req.options).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      })
    );
  }

  //another method to skip baseUrl for file upload
  fetchForFile(req: any): Observable<any> {
    return this.http.request(req.method, req.url, req.options).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      })
    );
  }

  // get user
  getUser(req: Inpute): Observable<UserModel> {
    const url: string = this.serverUrl + req.url;
    return this.http.request<UserModel>(req.method, url, req.options).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      })
    );
  }

  private handleErrorResponse(error: HttpErrorResponse): void {
    const statusCode = error.status;
    const message = error.message || '';
    if(statusCode == 401){
      localStorage.clear();
      this.router.navigate(['/auth']);
    }
    if(error.error?.message){
      Utility.decide(statusCode, error.error.message);
      return;
    }
    Utility.decide(statusCode, message);
  }
}

