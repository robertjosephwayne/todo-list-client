import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),

  on(AuthActions.loginSuccess, (state, { jwtToken }) => {
    return {
      ...state,
      jwtToken,
      isLoading: false
    };
  }),

  on(AuthActions.loginFailure, (state) => {
    return {
      ...state,
      isLoading: false
    };
  }),

  on(AuthActions.signup, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),

  on(AuthActions.signupSuccess, (state) => {
    return {
      ...state,
      isLoading: false
    };
  }),

  on(AuthActions.signupFailure, (state) => {
    return {
      ...state,
      isLoading: false
    };
  }),

  on(AuthActions.logout, (state) => {
    return {
      ...state,
      jwtToken: null
    };
  }),



  on(AuthActions.updateJWTToken, (state, { jwtToken }) => {
    return {
      ...state,
      jwtToken
    };
  }),
);

export function authReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
