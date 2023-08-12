import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent {

  constructor(private postService: PostService, private router: Router){ }

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
      LoaderService.loader(true);
      if(data.body && data.tags && data.title && this.file){
        data.file = this.file;
        const res: any = await this.postService.create(data);
        if(res){
          res.subscribe((data: any)=>{
            if(data) ToastService.toast("Post created successfully");
            LoaderService.loader(false);
            this.router.navigate(['/posts']);
          })
        }
      }else{
        throw(Error("All fields are required"))
      }
    }
    catch(err: any){
      LoaderService.loader(false);
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
