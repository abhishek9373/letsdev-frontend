import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
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
    LoaderService.loader(true);
    this.postService.bootStrap().subscribe((data: any)=>{
      this.posts.push(...data.data);
    })
  }
}
