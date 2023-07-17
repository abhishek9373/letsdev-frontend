// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LandingPageComponent } from './modules/landing-page/landing-page.component';
// import { PostsComponent } from './modules/posts/posts.component';
// import { CoursesComponent } from './modules/courses/courses.component';
// import { PlacementsComponent } from './modules/placements/placements.component';
// import { AuthGuard } from './guard/auth.guard';
// import { OnBoardGuard } from './guard/onboard.guard'
// import { LoginComponent } from './modules/authentication/login/login.component';
// import { OnboardComponent } from './modules/authentication/onboard/onboard.component';
// import { DomainselectionComponent } from './modules/authentication/domainselection/domainselection.component';
// import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
// import { PostviewComponent } from './modules/postview/postview.component';
// import { CreatepostComponent } from './modules/createpost/createpost.component';
// import { ListComponent as QuestionsComponent } from './modules/questions/list/list.component';
// import { ViewComponent as QuestionView } from './modules/questions/view/view.component';
// import { CreateComponent as CreateQuestion } from './modules/questions/create/create.component'
// import { ChatpageComponent } from './modules/chats/chatpage/chatpage.component';
// import { ConnectionsComponent } from './modules/chats/connections/connections.component';
// import { ViewComponent as ProfileView } from './modules/profile/view/view.component';
// import { EditComponent as EditProfile } from './modules/profile/edit/edit.component';
// import { MylistComponent as MyQuestions } from './modules/questions/mylist/mylist.component';
// import { AnswerComponent } from './modules/questions/answer/answer.component';


// const routes: Routes = [
//   { path: '', component: LandingPageComponent },
//   {
//     path: 'auth', children: [{
//       path: '',
//       component: LoginComponent
//     },
//     {
//       path: 'onboard',
//       component: OnboardComponent,
//       canActivate: [OnBoardGuard]
//     },
//     {
//       path: "domainselection",
//       component: DomainselectionComponent,
//       canActivate: [AuthGuard]
//     }
//     ]
//   },
//   {
//     path: 'posts', children: [
//       { path: '', component: PostsComponent },
//       { path: 'create', component: CreatepostComponent, canActivate: [AuthGuard] },
//       { path: ':id', component: PostviewComponent, canActivate: [AuthGuard] }
//     ]
//   },
//   {
//     path: 'questions', canActivateChild: [AuthGuard], canActivate: [AuthGuard], children: [
//       { path: '', component: QuestionsComponent},
//       { path: 'create', component: CreateQuestion },
//       { path: ':id', children: [
//         { path: '', component: QuestionView },
//         { path: 'answer', component: AnswerComponent },
//       ] },
//       { path: 'myquestions', component: MyQuestions },
//     ]
//   },
//   {
//     path: 'chats', canActivateChild: [AuthGuard], canActivate: [AuthGuard], children: [
//       { path: '', component: ConnectionsComponent},
//       { path: ':id', component: ChatpageComponent },
//     ]
//   },
//   {
//     path: 'profile', canActivateChild: [AuthGuard], canActivate: [AuthGuard], children: [
//       { path: '', component: ProfileView},
//       { path: ':id', component: ProfileView },
//       { path: 'edit', component: EditProfile },
//     ]
//   },
//   { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
//   { path: 'placements', component: PlacementsComponent, canActivate: [AuthGuard] },
//   {
//     path: "**",
//     component: PageNotFoundComponent
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { PostsComponent } from './modules/posts/posts.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { PlacementsComponent } from './modules/placements/placements.component';
import { AuthGuard } from './guard/auth.guard';
import { OnBoardGuard } from './guard/onboard.guard'
import { LoginComponent } from './modules/authentication/login/login.component';
import { OnboardComponent } from './modules/authentication/onboard/onboard.component';
import { DomainselectionComponent } from './modules/authentication/domainselection/domainselection.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { PostviewComponent } from './modules/postview/postview.component';
import { CreatepostComponent } from './modules/createpost/createpost.component';
import { ListComponent as QuestionsComponent } from './modules/questions/list/list.component';
import { ViewComponent as QuestionView } from './modules/questions/view/view.component';
import { CreateComponent as CreateQuestion } from './modules/questions/create/create.component'
import { ChatpageComponent } from './modules/chats/chatpage/chatpage.component';
import { ConnectionsComponent } from './modules/chats/connections/connections.component';
import { ViewComponent as ProfileView } from './modules/profile/view/view.component';
import { EditComponent as EditProfile } from './modules/profile/edit/edit.component';
import { MylistComponent as MyQuestions } from './modules/questions/mylist/mylist.component';
import { AnswerComponent } from './modules/questions/answer/answer.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'auth', children: [{
      path: '',
      component: LoginComponent
    },
    {
      path: 'onboard',
      component: OnboardComponent,
      // canActivate: [OnBoardGuard]
    },
    {
      path: "domainselection",
      component: DomainselectionComponent,
      // canActivate: [AuthGuard]
    }
    ]
  },
  {
    path: 'posts', children: [
      { path: '', component: PostsComponent },
      { path: 'create', component: CreatepostComponent },
      { path: ':id', component: PostviewComponent }
    ]
  },
  {
    path: 'questions', children: [
      { path: '', component: QuestionsComponent},
      { path: 'create', component: CreateQuestion },
      { path: 'myquestions', component: MyQuestions },
      { path: ':id', children: [
        { path: '', component: QuestionView },
        { path: 'answer', component: AnswerComponent },
      ] },
    ]
  },
  {
    path: 'chats', children: [
      { path: '', component: ConnectionsComponent},
      { path: ':id', component: ChatpageComponent },
    ]
  },
  {
    path: 'profile', children: [
      { path: '', component: ProfileView},
      { path: ':id', component: ProfileView },
      { path: 'edit', component: EditProfile },
    ]
  },
  { path: 'courses', component: CoursesComponent },
  { path: 'placements', component: PlacementsComponent },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
