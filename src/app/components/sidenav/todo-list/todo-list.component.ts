import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NewTodo } from 'src/app/models/new-todo.model';
import { Project } from 'src/app/models/project.model';
import { Todo } from '../../../models/todo.model';
import { SidenavStore } from '../sidenav.store';
import { CreateTodoDialogComponent } from './create-todo-dialog/create-todo-dialog.component';
import { EditTodoDialogComponent } from './edit-todo-dialog/edit-todo-dialog.component';
import { TodoListStore } from './todo-list.store';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TodoListComponent implements OnInit {
  readonly columnsToDisplay$ = this.todoListStore.columnsToDisplay$;
  readonly editingTodo$ = this.todoListStore.editingTodo$;
  readonly isEditing$ = this.todoListStore.isEditing$;
  readonly isLoading$ = this.todoListStore.isLoading$;
  readonly selectedProjectId$ = this.todoListStore.selectedProjectId$;
  readonly selectedProjectName$ = this.todoListStore.selectedProjectName$;
  readonly selectedProjectTodoCount$ = this.todoListStore.selectedProjectTodoCount$;
  readonly selectedProjectTodos$ = this.todoListStore.selectedProjectTodos$;
  projects: Project[];
  projectsSub: Subscription;

  constructor(
    private readonly dialog: MatDialog,
    private readonly sidenavStore: SidenavStore,
    private readonly todoListStore: TodoListStore,
  ) { }

  ngOnInit(): void {
    this.todoListStore.initializeProjects();
    this.setProjectsSub();
  }

  handleCreateTodoDialogResult(result: { title: string, projectId: string; }): void {
    if (!result?.title) return;
    const newTodo: NewTodo = {
      title: result.title,
      projectId: result.projectId,
      isComplete: false
    };
    this.todoListStore.createTodo(newTodo);
  }

  handleEditTodoDialogResult(originalTodo: Todo, result: { title: string, projectId: string; }) {
    if (!result?.title || !result?.projectId) return;
    const editedTodo: Todo = {
      ...originalTodo,
      title: result.title,
      projectId: result.projectId
    };
    this.todoListStore.editTodo(editedTodo);
  }

  onDeleteTodo(todo: Todo): void {
    this.todoListStore.deleteTodo(todo);
  }

  onRowClick($event, todo: Todo): void {
    if ($event.target.nodeName !== "MAT-CELL") return;
    this.openEditTodoDialog(todo);
  }

  onToggleCompleteStatus(todo: Todo): void {
    const updatedTodo: Todo = {
      ...todo,
      isComplete: !todo.isComplete
    };
    this.todoListStore.editTodo(updatedTodo);
  }

  openCreateTodoDialog(selectedProjectId: string): void {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
      data: {
        title: '',
        projectId: selectedProjectId
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.handleCreateTodoDialogResult(result);
    });
  }

  openEditTodoDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      data: {
        todo,
        projects: this.projects
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.handleEditTodoDialogResult(todo, result);
    });
  }

  setProjectsSub(): void {
    this.projectsSub = this.todoListStore.projects$.subscribe(projects => {
      this.projects = projects;
    });
  }

  ngOnDestroy(): void {
    this.sidenavStore.closeDrawer();
    this.projectsSub.unsubscribe();
  }
}
