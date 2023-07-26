import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OnboardGuard } from 'src/app/guard/onboard.guard';
import { OnboardComponent } from './onboard/onboard.component';
import { DomainselectionComponent } from './domainselection/domainselection.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { VerificationGuard } from 'src/app/guard/verification.guard';
import { EmailverificationComponent } from './emailverification/emailverification.component';

const routes: Routes = [
    {
      path: '',
      component: LoginComponent,
    },
    {
      path: 'onboard',
      canActivate: [OnboardGuard],
      component: OnboardComponent,
    },
    {
      path: "domainselection",
      component: DomainselectionComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'verifyemail',
      canActivate: [VerificationGuard],
      component: EmailverificationComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
