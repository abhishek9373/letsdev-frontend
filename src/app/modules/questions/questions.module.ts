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
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AuthService,
    UserService,
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class QuestionsModule { }
