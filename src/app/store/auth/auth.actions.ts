import { createAction, props } from '@ngrx/store';

import { LoginCredentials } from 'src/app/models/login-credentials.model';
import { SignupInformation } from 'src/app/models/signup-information.model';

export const login = createAction(
  '[Auth] Login',
  props<{ loginCredentials: LoginCredentials }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ jwtToken: string }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const signup = createAction(
  '[Auth] Signup',
  props<{ signupInformation: SignupInformation }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success'
);

export const syncLocalStorageToken = createAction(
  '[Auth] Sync Local Storage Token'
);

export const updateJWTToken = createAction(
  '[Auth] Update JWT Token',
  props<{ jwtToken: string }>()
);
