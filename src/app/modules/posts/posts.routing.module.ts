import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// componets
import { PostsComponent } from "./posts/posts.component";
import { PostviewComponent } from "./postview/postview.component";
import { CreatepostComponent } from "./createpost/createpost.component";
import { AuthGuard } from "src/app/guard/auth.guard";

const routes: Routes = [
      { path: '', component: PostsComponent},
      { path: 'create', component: CreatepostComponent},
      { path: ':id', component: PostviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
