import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any = [];

  constructor (private postService: PostService){}
  ngOnInit(): void {
    this.postService.bootStrap().subscribe((data: any)=>{
      this.posts.push(...data.data);
      console.log(this.posts);
    })
  }
}
