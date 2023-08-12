import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PostInterface, PostInterfaceFinal } from 'src/app/interfaces/Post.interface';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { comment, commentResponse } from 'src/app/interfaces/Comment.interface';
import { User } from 'src/app/interfaces/user';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.css']
})
export class PostviewComponent implements OnInit {

  user!: User;
  postId!: string;
  page: number = 0;
  isEnd: boolean = false;

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private router: Router) { }
  post: PostInterfaceFinal = {
    _id: "",
    tags: [""],
    title: "",
    body: "",
    createdAt: new Date,
    user: { _id: "", name: "" },
    image: [{ url: "" }],
    preferences: { likes: 0, dislikes: 0, shares: 0 },
    interaction: { isliked: false, isdisliked: false }
  };

  // inital Posts empty
  comments: Array<comment> = [{
    _id: "",
    text: "",
    preferences: { likes: 0, dislikes: 0 },
    user: { name: "", _id: "" },
    createdAt: new Date,
    interaction: { isliked: false, isdisliked: false },
    likes: 0,
    dislikes: 0
  }]

  ngOnInit(): void {
    // get postdetails and inital comments
    try {
      LoaderService.loader(true)
      this.activatedRoute.params.subscribe((param: any) => {
        this.postId = param.id;
        this.postService.getPost(this.postId).subscribe((data: PostInterface) => {
          this.post = data.data;
          setTimeout(()=>{
            LoaderService.loader(false)
          }, 700)
        })
      })
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error);
    }

    try {
      this.postService.listComments(this.postId, 0).subscribe((data: commentResponse) => {
        if (data.data.length < 30) {
          this.isEnd = false;
        }
        this.comments = data.data;
      })
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error)
    }

  }

  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.minLength(5)])
  })

  get comment() {
    return this.commentForm.value.comment;
  }

  // create comment
  createComment() {
    try {
      const text: any = this.commentForm.value.comment;
      this.postService.createComment(this.postId, text).subscribe((data: any) => {
        this.commentForm.reset();
        // insert new comment into comment array
        const newComment = data.data;
        delete newComment.updatedAt;
        delete newComment.postId;
        delete newComment.userId;
        this.comments.unshift(newComment);

        // setTimeout(() => {
        //   const scrollDiv = document.documentElement || document.body;
        //   scrollDiv.scrollTo({
        //     top: scrollDiv.scrollHeight,
        //     behavior: "smooth",
        //   });
        // }, 100);
      })
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error);
    }
  }

  // like post
  like(comment: any) {
    try {
      console.log(comment)
      if (comment.interaction.isliked) {
        this.postService.rmCommentLike(comment._id).subscribe((result: any) => {
          comment.interaction.isliked = false;
          comment.likes--;
          ToastService.toast("comment unliked!")
          return;
        })
      } else {
        this.postService.likeComment(comment._id).subscribe((result: any) => {
          comment.interaction.isliked = true;
          comment.likes++;
          ToastService.toast("comment liked!")
          return;
        })
      }
    } catch (error: any) {
      ToastService.toast(error.message)
      throw (error);
    }
  }


  dislike(comment: any) {
    try {
      if (comment.interaction.isdisliked) {
        this.postService.rmCommentDislike(comment._id).subscribe((result: any) => {
          comment.interaction.isdisliked = false;
          comment.dislikes--;
          ToastService.toast("comment disliked!")
          return;
        })
      } else {
        this.postService.dislikeComment(comment._id).subscribe((result: any) => {
          comment.interaction.isdisliked = true;
          comment.dislikes++;
          ToastService.toast("comment removed!");
          return;
        })
      }
    } catch (error: any) {
      ToastService.toast(error.message)
      throw (error);
    }
  }

  onScroll(): void {
    if (this.isEnd) {
      return;
    }
    else {
      this.postService
        .listComments(this.postId, ++this.page)
        .subscribe((data: commentResponse) => {
          if(data.data.length < 30){
            this.isEnd = true;
            this.comments.push(...data.data);
          }else{
            this.comments.push(...data.data);
          }
        });
    }
  }
}
