import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Inpute } from '../interfaces/fetch.inpute';
import { RawPost } from '../modules/posts/createpost/createpost.component';
import { ToastService } from './toast.service';
import { FileService } from './file.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { fileRequest, fileResponse, patchResponse } from '../interfaces/common.interface';
import { PostInterface } from '../interfaces/Post.interface';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private baseService: BaseService, private fileService: FileService) { }

  // get initial posts
  bootStrap(): Observable<any> {
    try {
      const page: number = 0;
      const paramObject: Inpute = { method: "GET", options: {}, url: `/post?page=${page}` }
      return this.baseService.fetch(paramObject).pipe(
        map((data: any) => data)
      );
    } catch (error) {
      throw (error);
    }
  }

  create(post: RawPost): Observable<any> {
    // get file upload urls
    const extension: any = post.file.name.split('.').pop();
    const fileRequestObject: fileRequest = { module: "post", requirement: [{ order: 0, extension: extension }] }

    // get signed url for file
    return this.fileService.file(fileRequestObject).pipe(
      switchMap((fileResponse: fileResponse) => {
        if (!fileResponse) { ToastService.toast("something went wrong") }

        // upload file
        return this.fileService.upload(post.file, fileResponse.data[0]).pipe(
          switchMap((fileUploadResponse: any) => {
            if (!fileUploadResponse) { ToastService.toast("something went wrong") };
            // create postRequest object
            // omit file from body to create post
            const body: any = { ...post };
            delete body.file;
            delete body.image;
            // create post
            const requestObject: Inpute = { method: "POST", options: { body: { ...body, fileId: fileResponse.data[0].id } }, url: "/post" };
            return this.baseService.fetch(requestObject);
          }))
      })
    )
  }

  // like post
  like(postId: string): Observable<boolean> {
    try {
      const reqObj: Inpute = { method: "PATCH", url: `/post/${postId}/like`, options: {} };
      return this.baseService.fetch(reqObj).pipe(tap((data) => {
        return data;
      }))
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error);
    }
  }

  // remove like
  rmLike(postId: string): Observable<boolean> {
    try {
      const reqObj: Inpute = { method: "DELETE", url: `/post/${postId}/like`, options: {} };
      return this.baseService.fetch(reqObj).pipe(tap((data) => {
        return data;
      }))
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error);
    }
  }

  // dislike post
  dislike(postId: string): Observable<boolean> {
    try {
      const reqObj: Inpute = { method: "PATCH", url: `/post/${postId}/dislike`, options: {} };
      return this.baseService.fetch(reqObj).pipe(tap((data) => {
        return data;
      }))
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error);
    }
  }

  //remove dislike
  rmDislike(postId: string): Observable<boolean> {
    try {
      const reqObj: Inpute = { method: "DELETE", url: `/post/${postId}/dislike`, options: {} };
      return this.baseService.fetch(reqObj).pipe(tap((data) => {
        return data;
      }))
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error);
    }
  }

  //get post by id
  getPost(postId: string): Observable<PostInterface> {
    try {
      const reqObj: Inpute = { method: "GET", url: `/post/${postId}`, options: {} };
      return this.baseService.fetch(reqObj).pipe(tap((data: PostInterface) => {
        return data;
      }))
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error);
    }
  }

    //list comments
    listComments(postId: string, page = 0): Observable<any> {
      try {
        const reqObj: Inpute = { method: "GET", url: `/post/${postId}/comments?page=${page}`, options: {} };
        return this.baseService.fetch(reqObj).pipe(tap((data) => {
          return data;
        }))
      } catch (error: any) {
        ToastService.toast(error.message);
        throw (error);
      }
    }

    // create comment
    createComment(postId: string, text: string): Observable<any> {
      try {
        const reqObj: Inpute = { method: "POST", url: `/post/${postId}/comments`, options: { body: { text } } };
        return this.baseService.fetch(reqObj).pipe(tap((data: patchResponse) => {
          return data;
        }))
      } catch (error: any) {
        ToastService.toast(error.message);
        throw (error);
      }
    }
}
