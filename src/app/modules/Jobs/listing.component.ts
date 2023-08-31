import { Component } from '@angular/core';

@Component({
  selector: 'app-placements',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class PlacementsComponent {

  filterVisibility: boolean = false;

  filterHideShow(){
    const divEle: any = document.getElementById('fs');
    divEle.style = `display: ${this.filterVisibility ? "none" : "block"};`;
    this.filterVisibility = !this.filterVisibility;
  }
}
