import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { PlacementsComponent } from './modules/Jobs/listing.component';
import { AuthGuard } from './guard/auth.guard';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [LoginGuard] },
  {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/posts/posts.module').then((m) => m.PostsModule)
  },
  {
    path: 'questions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/questions/questions.module').then((m) => m.QuestionsModule)
  },
  {
    path: 'chats',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/chats/chats.module').then((m) => m.ChatsModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/profile/profile.module').then((module) => module.ProfileModule)
  },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'placements', component: PlacementsComponent, canActivate: [AuthGuard] },
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
