import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Todo } from '../../models/todo.model';

import * as TodoListActions from '../../store/todo-list/todo-list.actions';
import * as fromTodoList from '../../store/todo-list/todo-list.selectors';
import { SidenavStore } from '../sidenav/sidenav.store';
import { TodoListEditorComponent } from '../todo-list-editor/todo-list-editor.component';

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
  allTodos: Todo[];
  allTodosSub: Subscription;
  incompleteTodos: Todo[];
  incompleteTodosSub: Subscription;
  isLoading: boolean;
  isLoadingSub: Subscription;
  isEditing: boolean;
  isEditingSub: Subscription;
  editingTodo: Todo;
  editingTodoSub: Subscription;
  columnsToDisplay = ['title', 'buttons'];

  constructor(
    private store: Store,
    private readonly sidenavStore: SidenavStore,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchTodoList();
    this.setAllTodosSub();
    this.setIncompleteTodosSub();
    this.setIsLoadingSub();
    this.setEditingTodoSub();
    this.setIsEditingSub();
  }

  fetchTodoList(): void {
    this.store.dispatch(TodoListActions.fetchTodoList());
  }

  setAllTodosSub(): void {
    this.allTodosSub = this.store.select(fromTodoList.selectAllTodos).subscribe(allTodos => {
      this.allTodos = allTodos;
    });
  }

  setIncompleteTodosSub(): void {
    this.incompleteTodosSub = this.store.select(fromTodoList.selectIncompleteTodos).subscribe(incompleteTodos => {
      this.incompleteTodos = incompleteTodos;
    });
  }

  setIsLoadingSub(): void {
    this.isLoadingSub = this.store.select(fromTodoList.selectIsLoading).subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  setEditingTodoSub(): void {
    this.editingTodoSub = this.store.select(fromTodoList.selectEditingTodo).subscribe(editingTodo => {
      this.editingTodo = editingTodo;
    });
  }

  setIsEditingSub(): void {
    this.isEditingSub = this.store.select(fromTodoList.selectIsEditing).subscribe(isEditing => {
      this.isEditing = isEditing;
    });
  }

  onDeleteTodoItem(todo: Todo): void {
    this.store.dispatch(TodoListActions.deleteTodoItem({ id: todo.id }))
  }

  onEditTodoItem(todo: Todo): void {
    this.store.dispatch(TodoListActions.startEditingTodoItem({ todoItem: todo }));
    this.dialog.open(TodoListEditorComponent);
  }

  onCreateTodoItem(): void {
    this.dialog.open(TodoListEditorComponent);
  }

  onToggleCompleteStatus(todo: Todo): void {
    const updatedTodoItem: Todo = {
      ...todo,
      isComplete: !todo.isComplete
    };
    this.store.dispatch(TodoListActions.editTodoItem({
      previousTodoItem: todo,
      updatedTodoItem
    }));
  }

  ngOnDestroy(): void {
    this.allTodosSub.unsubscribe();
    this.incompleteTodosSub.unsubscribe();
    this.isLoadingSub.unsubscribe();
    this.editingTodoSub.unsubscribe();
    this.isEditingSub.unsubscribe();
    this.sidenavStore.closeDrawer();
  }
}
