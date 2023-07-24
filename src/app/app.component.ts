import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private route: ActivatedRoute){}

  isLoginPage(): boolean {
    return (this.router.url.startsWith('/auth') || (this.route.firstChild?.component === PageNotFoundComponent)) ? true : false;
  }

  title = 'letsdev';
}
