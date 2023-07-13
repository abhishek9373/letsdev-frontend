import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { PostsComponent } from './modules/posts/posts.component';
import { ChatsComponent } from './modules/chats/chats.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { QuestionsComponent } from './modules/questions/questions.component';
import { PlacementsComponent } from './modules/placements/placements.component';
import { AuthGuard } from './guard/auth.guard';
import { OnBoardGuard } from './guard/onboard.guard'
import { LoginComponent } from './modules/authentication/login/login.component';
import { OnboardComponent } from './modules/authentication/onboard/onboard.component';
import { DomainselectionComponent } from './modules/authentication/domainselection/domainselection.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { PostviewComponent } from './modules/postview/postview.component';
import { CreatepostComponent } from './modules/createpost/createpost.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'posts', children: [
      { path: '', component: PostsComponent },
      { path: 'create', component: CreatepostComponent },
      { path: ':id', component: PostviewComponent }
    ]
  },
  { path: 'chats', component: ChatsComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'questions', component: QuestionsComponent, canActivate: [AuthGuard] },
  { path: 'placements', component: PlacementsComponent, canActivate: [AuthGuard] },
  {
    path: 'auth', children: [{
      path: '',
      component: LoginComponent
    },
    {
      path: 'onboard',
      component: OnboardComponent,
      canActivate: [OnBoardGuard]
    },
    {
      path: "domainselection",
      component: DomainselectionComponent,
      canActivate: [AuthGuard]
    }
    ]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
