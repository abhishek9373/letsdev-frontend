import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent {

  constructor(private postService: PostService){ }

  // selecting image
  fileName?: string;
  imageUrl?: string;
  file?: File;
  getImage(event: any){
    this.file = event.target.files[0];
    this.getImageUrl(event.target.files[0]);
    this.fileName = event.target.files[0].name;
  }

  getImageUrl(file: File): void {
    this.imageUrl =  URL.createObjectURL(file);
  }

  // creating post
  async publishPost(data: RawPost){
    try{
      if(data.body && data.tags && data.title && this.file){
        data.file = this.file;
        const res: any = await this.postService.create(data);
        if(res){
          res.subscribe((data: any)=>{
            if(data) ToastService.toast("Post created successfully");
          })
        }
      }else{
        throw(Error("All fields are required"))
      }
    }
    catch(err: any){
      ToastService.toast(err.message);
    }

  }
}
export interface RawPost {
  title: string,
  body: string,
  tags: string,
  file: File
}
