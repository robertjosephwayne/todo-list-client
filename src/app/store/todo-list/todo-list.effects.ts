import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../app.state';

import * as TodoListActions from './todo-list.actions';

import { TodoListService } from 'src/app/services/todo-list.service';



@Injectable()
export class TodoListEffects {
  fetchTodoList$ = createEffect(() => this.actions$.pipe(
    ofType(TodoListActions.fetchTodoList),
    map(() => this.todoListService.fetchTodoList())
  ), { dispatch: false });

  deleteTodoItem$ = createEffect(() => this.actions$.pipe(
    ofType(TodoListActions.deleteTodoItem),
    map((action) => {
      this.todoListService.deleteTodoItem(action.id);
    })
  ), { dispatch: false });

  createTodoItem$ = createEffect(() => this.actions$.pipe(
    ofType(TodoListActions.createTodoItem),
    map((action) => {
      this.todoListService.createTodoItem(
        action.title,
        action.description
      );
    })
  ), { dispatch: false });

  completeStatusChanged$ = createEffect(() => this.actions$.pipe(
    ofType(TodoListActions.completeStatusChanged),
    map((action) => {
      this.todoListService.updateCompleteStatus(
        action.id,
        action.previousCompleteStatus,
        action.updatedCompleteStatus
      );
    })
  ), { dispatch: false });

  editTodoItemTitle$ = createEffect(() => this.actions$.pipe(
    ofType(TodoListActions.editTodoItemTitle),
    map((action) => {
      this.todoListService.editTodoItemTitle(
        action.id,
        action.previousTitle,
        action.updatedTitle
      );
    })
  ), { dispatch: false });

  editTodoItemDescription$ = createEffect(() => this.actions$.pipe(
    ofType(TodoListActions.editTodoItemDescription),
    map((action) => {
      this.todoListService.editTodoItemDescription(
        action.id,
        action.previousDescription,
        action.updatedDescription
      );
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,

    private todoListService: TodoListService
  ) { }
}
