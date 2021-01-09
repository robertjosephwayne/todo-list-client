import { Component, OnInit } from '@angular/core';
import { SidenavStore } from '../sidenav.store';
import { TodoListStore } from '../todo-list/todo-list.store';

@Component({
  selector: 'app-sidenav-drawer',
  templateUrl: './sidenav-drawer.component.html',
  styleUrls: ['./sidenav-drawer.component.css']
})
export class SidenavDrawerComponent implements OnInit {
  readonly customProjects$ = this.todoListStore.customProjects$;
  readonly inboxProject$ = this.todoListStore.inboxProject$;
  readonly inboxSelected$ = this.todoListStore.inboxSelected$;
  readonly isAuth$ = this.store.select(fromAuth.selectIsAuth);
  readonly projectListOpen$ = this.sidenavStore.projectListOpen$;
  readonly selectedProject$ = this.todoListStore.selectedProject$;

  constructor(
    private readonly sidenavStore: SidenavStore,
    private readonly todoListStore: TodoListStore
  ) { }

  ngOnInit(): void {
  }

  selectProject(project: string): void {
  selectInbox(): void {
    this.todoListStore.setInboxSelected();
  }
    this.todoListStore.setSelectedProject(project);
  }

  toggleProjectList(): void {
    this.sidenavStore.toggleProjectList();
  }
}
