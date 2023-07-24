import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainselectionComponent } from './domainselection/domainselection.component';
import { OnboardComponent } from './onboard/onboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';


@NgModule({
  declarations: [
    DomainselectionComponent,
    LoginComponent,
    OnboardComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
