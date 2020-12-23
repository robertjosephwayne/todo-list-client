import { ActionReducerMap } from '@ngrx/store';

import { AppState } from './app.state';

import { todoListReducer } from './todo-list/todo-list.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  todoList: todoListReducer,
};
