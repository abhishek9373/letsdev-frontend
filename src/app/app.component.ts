import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { ToastService } from './services/toast.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  toastText?: string;
  hideToast: boolean = true;
  loaderStyleHide = { "display": "none" };
  loaderStyleShow = { "display": "flex" };
  loaderStyle: any = { "display": "none" };

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngAfterViewInit(): void {
    ToastService.toaster$.subscribe((message: string) => {
      this.showToast(message);
    })
    LoaderService.loader$.subscribe((message: boolean) => {
      this.showLoader(message)
    })
  }

  // showLoader(message: string) {
  //   this.loaderStyle = { "display": `${message}` };
  //   setTimeout(() => {
  //     this.loaderStyle = { "display": "none" };
  //   }, 700)
  // }

  showLoader(message: boolean){
    if(message == true ){
      this.loaderStyle = this.loaderStyleShow;
    }else{
      this.loaderStyle = this.loaderStyleHide;
    }
  }

  showToast(message: string) {
    this.toastText = message;
    this.hideToast = false;
    setTimeout(() => {
      this.hideToast = true;
    }, 5000)
  }

  isLoginPage(): boolean {
    return (this.router.url.startsWith('/auth') || (this.route.firstChild?.component === PageNotFoundComponent) || this.router.url == '/') ? true : false;
  }

  title = 'letsdev';
}
