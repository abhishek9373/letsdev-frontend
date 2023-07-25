import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { UserModel } from '../models/user.model';
import { Utility } from '../models/error.model';
import { Inpute } from '../interfaces/fetch.inpute';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  private serverUrl: string = "https://devbuilder.tech/services";

  fetch(req: Inpute): Observable<any> {
    const url: string = this.serverUrl + req.url;
    return this.http.request(req.method, url, req.options).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      })
    );
  }

  fetchForFile(req: any): Observable<any> {
    const url: string = req.url;
    return this.http.put(url, req.headers, req.body).pipe(
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
    Utility.decide(statusCode, message);
  }
}

