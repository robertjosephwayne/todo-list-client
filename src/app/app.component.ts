import { Component } from '@angular/core';
import { SidenavStore } from './components/sidenav/sidenav.store';
import { TodoListStore } from './components/sidenav/todo-list/todo-list.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SidenavStore, TodoListStore]
})
export class AppComponent { }
