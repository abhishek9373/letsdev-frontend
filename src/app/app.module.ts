import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { PostsComponent } from './modules/posts/posts.component';
import { QuestionsComponent } from './modules/questions/questions.component';
import { ChatsComponent } from './modules/chats/chats.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { PlacementsComponent } from './modules/placements/placements.component';

import { HttpClientModule } from '@angular/common/http';
import { DomainselectionComponent } from './modules/authentication/domainselection/domainselection.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { PostviewComponent } from './modules/postview/postview.component';
import { CreatepostComponent } from './modules/createpost/createpost.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    PostsComponent,
    QuestionsComponent,
    ChatsComponent,
    CoursesComponent,
    PlacementsComponent,
    DomainselectionComponent,
    PageNotFoundComponent,
    PostviewComponent,
    CreatepostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
