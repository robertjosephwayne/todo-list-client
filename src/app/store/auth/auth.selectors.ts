import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAuth = (state: AppState) => state.auth;

export const selectJWTToken = createSelector(
  selectAuth,
  (auth) => auth.jwtToken
);

export const selectIsAuth = createSelector(
  selectJWTToken,
  (jwtToken) => !!jwtToken
);

export const selectIsLoading = createSelector(
  selectAuth,
  (auth) => auth.isLoading
);
