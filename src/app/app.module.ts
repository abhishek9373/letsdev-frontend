import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { PostsComponent } from './modules/posts/posts.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { PlacementsComponent } from './modules/placements/placements.component';

import { HttpClientModule } from '@angular/common/http';
import { DomainselectionComponent } from './modules/authentication/domainselection/domainselection.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { PostviewComponent } from './modules/postview/postview.component';
import { CreatepostComponent } from './modules/createpost/createpost.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { ListComponent } from './modules/questions/list/list.component';
import { CreateComponent } from './modules/questions/create/create.component';
import { ViewComponent } from './modules/questions/view/view.component';
import { ConnectionsComponent } from './modules/chats/connections/connections.component';
import { ChatpageComponent } from './modules/chats/chatpage/chatpage.component';
import { EditComponent } from './modules/profile/edit/edit.component';

import { ProfileModule } from './modules/profile/profile.module';
import { AnswerComponent } from './modules/questions/answer/answer.component';
import { MylistComponent } from './modules/questions/mylist/mylist.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    PostsComponent,
    CoursesComponent,
    PlacementsComponent,
    DomainselectionComponent,
    PageNotFoundComponent,
    PostviewComponent,
    CreatepostComponent,
    NavbarComponent,
    ListComponent,
    CreateComponent,
    ViewComponent,
    ConnectionsComponent,
    ChatpageComponent,
    EditComponent,
    AnswerComponent,
    MylistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
