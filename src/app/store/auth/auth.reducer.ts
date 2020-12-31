import { Action, createReducer, on } from '@ngrx/store';

import { AuthState, initialState } from './auth.state';

import * as AuthActions from './auth.actions';

const _authReducer = createReducer(
  initialState,

  on(AuthActions.loginSuccess, (state, { jwtToken }) => {
    return {
      ...state,
      jwtToken
    };
  }),

  on(AuthActions.logout, (state) => {
    return {
      ...state,
      jwtToken: null
    };
  }),
);

export function authReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
