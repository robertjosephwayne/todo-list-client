import { Component } from '@angular/core';
import { SidenavStore } from './components/sidenav/sidenav.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SidenavStore]
})
export class AppComponent { }
