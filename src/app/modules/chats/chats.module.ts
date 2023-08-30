import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatpageComponent } from './chatpage/chatpage.component';
import { ConnectionsComponent } from './connections/connections.component';
import { ChatsRoutingModule } from './chats.routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  declarations: [
    ChatpageComponent,
    ConnectionsComponent
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    ReactiveFormsModule,
    PipeModule
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AuthService,
    UserService,
  ],
})
export class ChatsModule { }
