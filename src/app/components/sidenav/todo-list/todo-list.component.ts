import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NewTodo } from 'src/app/models/new-todo.model';
import { SidenavStore } from '../sidenav.store';
import { Todo } from '../../../models/todo.model';
import { TodoListStore } from './todo-list.store';
import { Project } from 'src/app/models/project.model';
import { EditTodoDialogComponent } from './edit-todo-dialog/edit-todo-dialog.component';
import { CreateTodoDialogComponent } from './create-todo-dialog/create-todo-dialog.component';

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
  readonly selectedProjectTodos$ = this.todoListStore.selectedProjectTodos$;

  constructor(
    private readonly dialog: MatDialog,
    private readonly sidenavStore: SidenavStore,
    private readonly todoListStore: TodoListStore,
  ) { }

  ngOnInit(): void {
    this.todoListStore.initializeProjects();
  }

  onDeleteTodo($event: Event, todo: Todo): void {
    $event.stopPropagation();
    this.todoListStore.deleteTodo(todo);
  }

  openEditTodoDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      data: {
        title: todo.title
      }
    });
    dialogRef.afterClosed().subscribe(result =>
      this.handleEditTodoDialogResult(todo, result)
    );
  }

  handleEditTodoDialogResult(originalTodo: Todo, result: { title: string }) {
    if (!result?.title || result.title === originalTodo.title) return;
    const editedTodo: Todo = {
      ...originalTodo,
      title: result.title
    };
    this.todoListStore.editTodo(editedTodo);
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

  handleCreateTodoDialogResult(result: { title: string, projectId: string }): void {
    if (!result?.title) return;
    const newTodo: NewTodo = {
      title: result.title,
      projectId: result.projectId,
      isComplete: false
    };
    this.todoListStore.createTodo(newTodo);
  }

  onToggleCompleteStatus(todo: Todo): void {
    const updatedTodo: Todo = {
      ...todo,
      isComplete: !todo.isComplete
    };
    this.todoListStore.editTodo(updatedTodo);
  }

  ngOnDestroy(): void {
    this.sidenavStore.closeDrawer();
  }
}
