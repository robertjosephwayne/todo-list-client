import { Component, HostListener, OnInit } from '@angular/core';
import { SidenavStore } from './sidenav.store';
import { TodoListStore } from './todo-list/todo-list.store';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers: [TodoListStore]
})
export class SidenavComponent implements OnInit {
  readonly drawerMode$ = this.sidenavStore.drawerMode$;
  readonly drawerOpen$ = this.sidenavStore.drawerOpen$;

  constructor(private readonly sidenavStore: SidenavStore) { }

  ngOnInit(): void {
    this.setDrawerMode();
  }

  @HostListener('window:resize', ['$event'])
  setDrawerMode(): void {
    if (window.innerWidth < 700) {
      this.sidenavStore.setDrawerMode('over');
    } else {
      this.sidenavStore.setDrawerMode('side');
    }
  }
}
