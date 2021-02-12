export interface AuthState {
  jwtToken: string;
  isLoading: boolean;
}

export const initialState: AuthState = {
  jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvYmVydEByb2JlcnQuY29tIiwic3ViIjoiNjAxZjc2YjA0ODdiMTIxZWMyMjc1YjJhIiwiaWF0IjoxNjEzMTExNTUzLCJleHAiOjE2MTMxMTE2MTN9.FjXmCokNQyZcl6zDFC0oBPax-p0aey9238sZnRLnVfs',
  isLoading: false
};
