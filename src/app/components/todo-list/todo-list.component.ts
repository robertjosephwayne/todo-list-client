import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Todo } from '../../models/todo.model';

import * as TodoListActions from '../../store/todo-list/todo-list.actions';
import * as fromTodoList from '../../store/todo-list/todo-list.selectors';

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
  todos$: Observable<Todo[]>;
  isLoading: boolean;
  isLoadingSub: Subscription;
  isEditing: boolean;
  isEditingSub: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.todos$ = this.store.select(fromTodoList.selectIncompleteTodos);
    this.fetchTodoList();

    this.isLoadingSub = this.store.select(fromTodoList.selectIsLoading).subscribe(isLoading => {
      this.isLoading = isLoading;
    })

    this.isEditingSub = this.store.select(fromTodoList.selectIsEditing).subscribe(isEditing => {
      this.isEditing = isEditing;
    })
  }

  fetchTodoList(): void {
    this.store.dispatch(TodoListActions.fetchTodoList());
  }

  onDelete(todo: Todo): void {
    this.store.dispatch(TodoListActions.deleteTodoItem({ id: todo.id }))
  }

  onEdit(todo: Todo): void {
    this.store.dispatch(TodoListActions.startEditingTodoItem({ todoItem: todo }));
  }
  ngOnDestroy(): void {
    this.isLoadingSub.unsubscribe();
    this.isEditingSub.unsubscribe();
  }
}
