import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PostInterface, PostInterfaceFinal } from 'src/app/interfaces/Post.interface';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { patchResponse } from 'src/app/interfaces/common.interface';
import { comment, commentResponse } from 'src/app/interfaces/Comment.interface';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.css']
})
export class PostviewComponent implements OnInit {

  user!: User;

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
  postId!: string;

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
      this.activatedRoute.params.subscribe((param: any) => {
        this.postId = param.id;
        this.postService.getPost(this.postId).subscribe((data: PostInterface) => {
          this.post = data.data;
        })
      })
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error);
    }

    try {
      this.postService.listComments(this.postId, 0).subscribe((data: commentResponse) => {
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
        console.log(data)
        // insert new comment into comment array
        const newComment = data.data;
        delete newComment.updatedAt;
        delete newComment.postId;
        delete newComment.userId;
        this.comments.push(newComment);


        setTimeout(() => {
          const scrollDiv = document.documentElement || document.body;
          scrollDiv.scrollTo({
            top: scrollDiv.scrollHeight,
            behavior: "smooth",
          });
        }, 100);



      })
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error);
    }
  }

}
