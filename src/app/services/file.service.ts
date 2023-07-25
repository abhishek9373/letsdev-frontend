import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Inpute } from '../interfaces/fetch.inpute';
import { fileRequest } from '../interfaces/common.interface';
import { Observable } from 'rxjs';

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
    console.log(uploadInfo.url);
    formData.append("thumbnail", file, `${uploadInfo.key}.${uploadInfo.extension}`);
    const requestObject = {
      // method: "PUT",
      url: uploadInfo.url,
      headers: {
          'Accept': '*/*',
          'Content-Type': `image/${uploadInfo.extension}`,
        },
      body: {
        file: formData
      }
    }
    return this.baseService.fetchForFile(requestObject);

  }


}
