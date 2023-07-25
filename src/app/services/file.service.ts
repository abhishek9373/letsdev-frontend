import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Inpute } from '../interfaces/fetch.inpute';
import { fileRequest } from '../interfaces/common.interface';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private baseService: BaseService) { }

  file(rawRequestObject: fileRequest): Observable<any> {
    const requestObject: Inpute = {
      method: "POST", options: {
        body: rawRequestObject
      },
      url: "/file"
    }
    return this.baseService.fetch(requestObject).pipe((data) => {
      return data;
    })
  }

  upload(file: File, uploadInfo: any): Observable<any> {
    const formData = new FormData;
    formData.append("thumbnail", file);
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': `image/${uploadInfo.extension}`,
    })
    const requestObject: Inpute = {
      method: "PUT",
      url: uploadInfo.url,
      options: {
        body: file,
        headers: headers
      }
    }
    return this.baseService.fetchForFile(requestObject);

  }


}
