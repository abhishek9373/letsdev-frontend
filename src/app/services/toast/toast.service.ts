import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  static toast(message: string, code?: number){
    alert(`${code ? code : ''} ${message}`);
  }
}
