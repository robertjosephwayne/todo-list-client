export interface AuthState {
  jwtToken: string;
  isLoading: boolean;
}

export const initialState: AuthState = {
  jwtToken: null,
  isLoading: false
};
