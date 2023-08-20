import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from "./posts/posts.component";
import { PostviewComponent } from "./postview/postview.component";
import { CreatepostComponent } from "./createpost/createpost.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { PostsRoutingModule } from './posts.routing.module';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/models/user.model';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  declarations: [
    PostsComponent,
    PostviewComponent,
    CreatepostComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule,
    PipeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AuthService,
    UserService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class PostsModule { }
