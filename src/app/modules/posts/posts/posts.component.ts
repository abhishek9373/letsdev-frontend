import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';
import { TimeAgoPipe } from 'src/app/pipes/time-ago.pipe';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {

  posts: any = [];
  page: number = 0;
  isEnd: boolean = false;
  constructor(private postService: PostService) { }
  ngOnInit(): void {
    LoaderService.loader(true);
    this.postService.bootStrap().subscribe((data: any) => {
      const postSize: number = data?.data?.length;
      if (postSize < 10) this.isEnd = true;
      this.posts.push(...data.data);
    })
  }

  // like post
  like(post: any) {
    try {
      if (post.interaction.isliked) {
        this.postService.rmLike(post._id).subscribe((result: any) => {
          post.interaction.isliked = false;
          post.preferences.likes--;
          ToastService.toast("post unliked!")
          return;
        })
      } else {
        this.postService.like(post._id).subscribe((result: any) => {
          post.interaction.isliked = true;
          post.preferences.likes++;
          ToastService.toast("post liked!")
          return;
        })
      }
    } catch (error: any) {
      ToastService.toast(error.message)
      throw (error);
    }
  }


  dislike(post: any) {
    try {
      if (post.interaction.isdisliked) {
        this.postService.rmDislike(post._id).subscribe((result: any) => {
          post.interaction.isdisliked = false;
          post.preferences.dislikes--;
          ToastService.toast("post disliked!")
          return;
        })
      } else {
        this.postService.dislike(post._id).subscribe((result: any) => {
          post.interaction.isdisliked = true;
          post.preferences.dislikes++;
          ToastService.toast("dislike removed!");
          return;
        })
      }
    } catch (error: any) {
      ToastService.toast(error.message)
      throw (error);
    }
  }

  // fetch post after scroll
  onScroll(): void {
    if (this.isEnd) {
      return;
    } else {
      try {
        this.postService
          .bootStrap(++this.page)
          .subscribe((newPosts: any) => {
            const postSize: number = newPosts?.data?.length;
            if (postSize < 10) {
              this.isEnd = true;
              this.posts.push(...newPosts.data);
            } else {
              this.posts.push(...newPosts.data);
            }
          });
      } catch (error: any) {
        ToastService.toast(error.message);
        throw (error);
      }
    }
  }
}
