import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NewProject } from 'src/app/models/new-project.model';
import { Project } from 'src/app/models/project.model';
import * as fromAuth from '../../../store/auth/auth.selectors';
import { SidenavStore } from '../sidenav.store';
import { TodoListStore } from '../todo-list/todo-list.store';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import { NewProjectDialogComponent } from './new-project-dialog/new-project-dialog.component';

@Component({
  selector: 'app-sidenav-drawer',
  templateUrl: './sidenav-drawer.component.html',
  styleUrls: ['./sidenav-drawer.component.css']
})
export class SidenavDrawerComponent implements OnInit {
  readonly customProjectCount$ = this.todoListStore.customProjectCount$;
  readonly customProjects$ = this.todoListStore.customProjects$;
  readonly inboxProject$ = this.todoListStore.inboxProject$;
  readonly inboxSelected$ = this.todoListStore.inboxSelected$;
  readonly isAuth$ = this.store.select(fromAuth.selectIsAuth);
  readonly projectListOpen$ = this.sidenavStore.projectListOpen$;
  readonly selectedProjectId$ = this.todoListStore.selectedProjectId$;

  constructor(
    private readonly dialog: MatDialog,
    private readonly sidenavStore: SidenavStore,
    private readonly store: Store,
    private readonly todoListStore: TodoListStore
  ) { }

  ngOnInit(): void { }

  handleCreateProjectDialogResult(result): void {
    if (!result) return;
    const newProject: NewProject = {
      name: result
    };
    this.todoListStore.createProject(newProject);
  }

  handleEditProjectDialogResult(updatedProject): void {
    this.todoListStore.editProject(updatedProject);
  }

  onProjectAdd($event): void {
    $event.stopPropagation();
    this.openCreateProjectDialog();
  }

  onProjectDelete(project: Project): void {
    if (!project.id) return;
    this.todoListStore.deleteProject(project);
  }

  onSelectProjectEditMenu($event): void {
    $event.stopPropagation();
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(NewProjectDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.handleCreateProjectDialogResult(result);
    });
  }

  openEditProjectDialog(project: Project): void {
    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      data: {
        project
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.handleEditProjectDialogResult(result);
    });
  }

  selectInbox(): void {
    this.todoListStore.setInboxSelected();
  }

  selectProject(project: Project): void {
    if (!project?.id) return;
    this.todoListStore.setSelectedProjectId(project.id);
  }

  toggleProjectList(): void {
    this.sidenavStore.toggleProjectList();
  }
}
