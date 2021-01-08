import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { NewTodo } from 'src/app/models/new-todo.model';
import { SidenavStore } from '../sidenav.store';
import { Todo } from '../../../models/todo.model';
import { TodoListEditorComponent } from './todo-list-editor/todo-list-editor.component';
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
  readonly vm$ = this.todoListStore.vm$;

  constructor(
    private readonly dialog: MatDialog,
    private readonly sidenavStore: SidenavStore,
    private readonly todoListStore: TodoListStore,
  ) { }

  ngOnInit(): void {
    this.todoListStore.setIsLoading(true);
    this.todoListStore.getTodos();
  }

  onDeleteTodo(todo: Todo): void {
    this.todoListStore.deleteTodo(todo);
  }

  openEditTodoDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoListEditorComponent, {
      data: {
        title: todo.title,
        isEditing: true
      }
    });
    dialogRef.afterClosed().subscribe(result =>
      this.handleEditTodoDialogResult(todo, result)
    );
  }

  handleEditTodoDialogResult(originalTodo: Todo, result) {
    if (!result.title || result.title === originalTodo.title) return;
    const editedTodo: Todo = {
      ...originalTodo,
      title: result.title
    };
    this.todoListStore.editTodo(editedTodo);
  }

  openCreateTodoDialog(): void {
    const dialogRef = this.dialog.open(TodoListEditorComponent, {
      data: {
        title: '',
        isEditing: false
      }
    });
    dialogRef.afterClosed().subscribe(this.handleCreateTodoDialogResult);
  }

  handleCreateTodoDialogResult(result): void {
    if (!result.title) return;
    const newTodo: NewTodo = {
      title: result.title,
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
