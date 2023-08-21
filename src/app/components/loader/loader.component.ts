import { Component, AfterViewInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements AfterViewInit {
  loaderStyleHide = { "display": "none" };
  loaderStyleShow = { "display": "flex" };
  loaderStyle: any = { "display": "none" };
  isLoader: boolean = false;

  ngAfterViewInit(): void {
    LoaderService.loader$.subscribe((message: boolean) => {
      this.showLoader(message)
    })
  }

  showLoader(message: boolean) {
    this.isLoader = message;
    // if (message == true) {
    //   this.loaderStyle = this.loaderStyleShow;
    // } else {
    //   this.loaderStyle = this.loaderStyleHide;
    // }
  }
}
