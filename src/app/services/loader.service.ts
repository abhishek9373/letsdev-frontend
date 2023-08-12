import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  // static loaderSubject: Subject<string> = new Subject<string>();

  static loaderSubject: Subject<boolean> = new Subject<boolean>();

  // static loader$: Observable<string> = LoaderService.loaderSubject.asObservable();

  static loader$: Observable<boolean> = LoaderService.loaderSubject.asObservable();

  // Method to emit toast messages.
  static loader(display: boolean) {
    // const condition = display == true ? "flex" : "none";
    // this.loaderSubject.next(condition);
    this.loaderSubject.next(display);
  }
}
