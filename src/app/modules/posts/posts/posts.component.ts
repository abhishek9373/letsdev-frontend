import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any = [];

  constructor (private postService: PostService){}
  ngOnInit(): void {
    LoaderService.loader(true);
    this.postService.bootStrap().subscribe((data: any)=>{
      this.posts.push(...data.data);
    })
  }

  // like post
  like(post: any){
    try{
      if(post.interaction.isliked){
        this.postService.rmLike(post._id).subscribe((result: any)=>{
          post.interaction.isliked = false;
          post.preferences.likes--;
          ToastService.toast("post disliked!")
          return;
        })
      }else{
        this.postService.like(post._id).subscribe((result: any)=>{
          post.interaction.isliked = true;
          post.preferences.likes++;
          ToastService.toast("post liked!")
          return;
        })
      }
    }catch(error: any){
      ToastService.toast(error.message)
      throw(error);
    }
  }


  dislike(post: any){
    try{
      if(post.interaction.isdisliked){
        this.postService.rmDislike(post._id).subscribe((result: any)=>{
          post.interaction.isdisliked = false;
          post.preferences.dislikes--;
          ToastService.toast("post disliked!")
          return;
        })
      }else{
        this.postService.dislike(post._id).subscribe((result: any)=>{
          post.interaction.isdisliked = true;
          post.preferences.dislikes++;
          ToastService.toast("dislike removed!");
          return;
        })
      }
    }catch(error: any){
      ToastService.toast(error.message)
      throw(error);
    }
  }

}
