import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerComponent } from './answer/answer.component';
import { MylistComponent } from './mylist/mylist.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

import { QuestionsRoutingModule } from './questions-routing.module';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/models/user.model';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  declarations: [
    AnswerComponent,
    MylistComponent,
    ListComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HighlightModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AuthService,
    UserService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
      }
    }
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class QuestionsModule { }
