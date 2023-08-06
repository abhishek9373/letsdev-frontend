import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, tap } from 'rxjs';
import { Inpute } from '../interfaces/fetch.inpute';
import { ToastService } from './toast.service';
import { questionRequestObject } from '../interfaces/Comment.interface';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private baseService: BaseService) { }

  //create question
  create(question: questionRequestObject): Observable<any> {
    try {
      const reqObj: Inpute = { method: "POST", url: `/question`, options: { body : { ...question }} };
      return this.baseService.fetch(reqObj).pipe(tap((data) => {
        return data;
      }))
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error);
    }
  }

    //list questions
    list(page = 0): Observable<any> {
      try {
        const reqObj: Inpute = { method: "GET", url: `/question?page=${page}`, options: { } };
        return this.baseService.fetch(reqObj).pipe(tap((data) => {
          return data;
        }))
      } catch (error: any) {
        ToastService.toast(error.message);
        throw (error);
      }
    }

}
