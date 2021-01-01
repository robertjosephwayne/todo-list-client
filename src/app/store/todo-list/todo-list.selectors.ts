import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

export const selectTodoList = (state: AppState) => state.todoList;

export const selectAllTodos = createSelector(
  selectTodoList,
  (todoList) => todoList.todos
);

export const selectIncompleteTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(todo => !todo.isComplete)
);

export const selectEditingTodo = createSelector(
  selectTodoList,
  (todoList) => todoList.editingTodo
);

export const selectIsEditing = createSelector(
  selectEditingTodo,
  (editingTodo) => !!editingTodo
);

export const selectTodoById = createSelector(
  selectAllTodos,
  (todos, props) => {
    return todos.find(todo => {
      todo.id === props.id;
    });
  }
);

export const selectIsLoading = createSelector(
  selectTodoList,
  (todoList) => todoList.isLoading
);
