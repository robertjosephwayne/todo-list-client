import { RouterReducerState } from '@ngrx/router-store';
import { AuthState } from './auth/auth.state';
import { RouterState } from './router/router.state';
import { TodoListState } from './todo-list/todo-list.state';

export interface AppState {
  auth: AuthState;
  router: RouterReducerState<any>;
  todoList: TodoListState;
}
