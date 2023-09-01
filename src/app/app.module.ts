import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UserService as userService } from './models/user.model';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomRouteReuseStrategy } from './services/norefresh.service';
import { PipeModule } from './pipes/pipe.module';
import { LoaderComponent } from './components/loader/loader.component';
import { ChatService } from './services/chat.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SOCKET_HOST } from '../../constants';
import { PlacementsComponent } from './modules/Jobs/listing.component';


const token: any = localStorage.getItem('authToken');
const config: SocketIoConfig = {
  url: SOCKET_HOST,
  options: {
    query: {
      token
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    LoaderComponent,
    PlacementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PipeModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthService,
    userService,
    UserService,
    { provide: CustomRouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    ChatService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
