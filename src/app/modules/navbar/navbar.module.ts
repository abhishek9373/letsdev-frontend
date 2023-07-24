import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [NavbarComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class NavbarModule { };
