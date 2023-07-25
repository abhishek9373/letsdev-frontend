import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  static toastSubject: Subject<string> = new Subject<string>();

  static toaster$: Observable<string> = ToastService.toastSubject.asObservable();

  // Method to emit toast messages.
  static toast(message: string, code?: number) {
    this.toastSubject.next(message);
  }
}
