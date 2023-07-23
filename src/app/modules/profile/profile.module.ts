import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ProfileModule { };
