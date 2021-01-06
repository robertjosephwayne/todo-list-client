import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  drawerMode: string;

  constructor() { }

  ngOnInit(): void {
    this.setDrawerMode();
  }

  @HostListener('window:resize', ['$event'])
  setDrawerMode(): void {
    if (window.innerWidth < 700) {
      this.drawerMode = 'over'
    } else {
      this.drawerMode = 'side';
    }
  }

}
