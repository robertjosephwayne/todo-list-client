import { Component, OnInit } from '@angular/core';
import { SidenavStore } from '../sidenav.store';
import { TodoListStore } from '../todo-list/todo-list.store';

@Component({
  selector: 'app-sidenav-drawer',
  templateUrl: './sidenav-drawer.component.html',
  styleUrls: ['./sidenav-drawer.component.css']
})
export class SidenavDrawerComponent implements OnInit {
  readonly projectListOpen$ = this.sidenavStore.projectListOpen$;
  readonly projectNames$ = this.todoListStore.projectNames$;
  readonly selectedProject$ = this.todoListStore.selectedProject$;

  constructor(
    private readonly sidenavStore: SidenavStore,
    private readonly todoListStore: TodoListStore
  ) { }

  ngOnInit(): void { }

  selectProject(project: string): void {
    this.todoListStore.setSelectedProject(project);
  }

  toggleProjectList(): void {
    this.sidenavStore.toggleProjectList();
  }
}
