export interface AuthState {
  jwtToken: string;
}

export const initialState: AuthState = {
  jwtToken: null
};
