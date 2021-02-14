import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    map((action) => {
      this.authService.login(action.loginCredentials);
    })
  ), { dispatch: false });

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    map((action) => {
      localStorage.setItem('jwtToken', action.jwtToken);
      this.router.navigate(['./']);
    })
  ), { dispatch: false });

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      localStorage.removeItem('jwtToken');
      this.router.navigate(['./login']);
    })
  ), { dispatch: false });

  signup$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signup),
    map((action) => {
      this.authService.signup(action.signupInformation);
    })
  ), { dispatch: false });

  signupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signupSuccess),
    map((action) => {
      localStorage.setItem('jwtToken', action.jwtToken);
      this.router.navigate(['./']);
    })
  ), { dispatch: false });

  syncLocalStorageToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.syncLocalStorageToken),
    map(() => {
      const jwtToken = localStorage.getItem('jwtToken');
      return AuthActions.updateJWTToken({ jwtToken });
    })
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) { }
}
