import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SidenavStore } from '../sidenav/sidenav.store';
import { Todo } from '../../models/todo.model';
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
  readonly todos$ = this.todoListStore.todos$;
  readonly isLoading$ = this.todoListStore.isLoading$;
  readonly isEditing$ = this.todoListStore.isEditing$;
  readonly editingTodo$ = this.todoListStore.editingTodo$;
  readonly columnsToDisplay$ = this.todoListStore.columnsToDisplay$;

  constructor(
    private readonly dialog: MatDialog,
    private readonly sidenavStore: SidenavStore,
    private readonly todoListStore: TodoListStore,
  ) { }

  ngOnInit(): void {
    this.todoListStore.getTodos();
  }

  onDeleteTodo(todo: Todo): void {
    
    this.todoListStore.deleteTodo(todo.id);
  }

  onEditTodo(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoListEditorComponent, {
      data: {
        title: todo.title,
        isEditing: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result.title) return;
      if (result.title === todo.title) return;
      const updatedTodo = {
        ...todo,
        title: result.title
      };
      this.todoListStore.editTodo(updatedTodo);
    });
  }

  onCreateTodo(): void {
    const dialogRef = this.dialog.open(TodoListEditorComponent, {
      data: {
        title: '',
        isEditing: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result.title) return;
      this.todoListStore.createTodo(result.title);
    });
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
