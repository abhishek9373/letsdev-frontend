import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Inpute } from '../interfaces/fetch.inpute';
import { RawPost } from '../modules/posts/createpost/createpost.component';
import { ToastService } from './toast.service';
import { FileService } from './file.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { fileRequest, fileResponse } from '../interfaces/common.interface';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private baseService: BaseService, private fileService: FileService) { }

  // get initial posts
  bootStrap() {
    try {
      const paramObject: Inpute = { method: "GET", options: { params: { page: 0 } }, url: "/posts" }
      this.baseService.fetch(paramObject).subscribe((data) => {
        if (data) {
          return data.data;
        }
      })
    } catch (error) {
      throw (error);
    }
  }

  create(post: RawPost): Observable<any> {

    // get file upload urls
    const extension: any = post.file.name.split('.').pop();
    const fileRequestObject: fileRequest = { module: "post", requirement: [{ order: 0, extension: extension } ]}
    return this.fileService.file(fileRequestObject).pipe(
      switchMap((fileResponse: fileResponse)=>{
        if(!fileResponse){ ToastService.toast("something went wrong")}
        return this.fileService.upload(post.file, fileResponse.data[0]).pipe(
          switchMap((fileUploadResponse: any)=>{
            if(!fileUploadResponse){ ToastService.toast("something went wrong")};
            // create postRequest object
            const requestObject: Inpute = { method: "POST", options: { body: {...post, fileId: fileResponse.data[0].id} }, url: "/post" };
            return this.baseService.fetch(requestObject);
          }))
      })
    )


  }
}
