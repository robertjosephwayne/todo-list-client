import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map, tap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../app.state';

import * as AuthActions from './auth.actions';
import * as TodoListActions from '../todo-list/todo-list.actions';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    map((action) => {
      this.authService.login(action.email, action.password);
    })
  ), { dispatch: false });

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    map((action) => {
      localStorage.setItem('jwtToken', action.jwtToken);
      this.router.navigate(['./']);
    })
  ), { dispatch: false });

  signup$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signup),
    map((action) => {
      this.authService.signup(action.email, action.password);
    })
  ), { dispatch: false });

  signupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signupSuccess),
    tap(() => {
      this.router.navigate(['./login']);
    })
  ), { dispatch: false });

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    map(() => {
      localStorage.removeItem('jwtToken');
      this.router.navigate(['./login']);
      return TodoListActions.clearTodos();
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService
  ) { }
}
