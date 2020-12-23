import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

export const selectTodoList = (state: AppState) => state.todoList;

export const selectAllTodos = createSelector(
  selectTodoList,
  (todoList) => todoList.todos
);
