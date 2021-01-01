import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map, tap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../app.state';

import * as TodoListActions from './todo-list.actions';

import { TodoListService } from 'src/app/services/todo-list.service';
import { Router } from '@angular/router';



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
        action.title
      );
    })
  ), { dispatch: false });

  createTodoItemSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TodoListActions.createTodoItemSuccess),
    tap(() => {
      this.router.navigate(['/']);
    })
  ), { dispatch: false });

  editTodoItem$ = createEffect(() => this.actions$.pipe(
    ofType(TodoListActions.editTodoItem),
    map((action) => {
      this.todoListService.editTodoItem(
        action.previousTodoItem,
        action.updatedTodoItem
      );
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private todoListService: TodoListService
  ) { }
}
