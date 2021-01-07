import { RouterReducerState } from '@ngrx/router-store';
import { AuthState } from './auth/auth.state';

export interface AppState {
  auth: AuthState;
  router: RouterReducerState<any>;
}
