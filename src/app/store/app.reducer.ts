import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  router: routerReducer,
};
