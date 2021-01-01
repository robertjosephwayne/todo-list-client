import { createAction, props } from '@ngrx/store';

import { Todo } from 'src/app/models/todo.model';

export const fetchTodoList = createAction(
  '[Todo List] Fetch Todo List'
);

export const fetchTodoListSuccess = createAction(
  '[Todo List] Fetch Todo List Success',
  props<{ todoList: Todo[] }>()
);

export const deleteTodoItem = createAction(
  '[Todo List] Delete Todo Item',
  props<{ id: string }>()
);

export const deleteTodoItemSuccess = createAction(
  '[Todo List] Delete Todo Item Success',
  props<{ id: string }>()
);

export const createTodoItem = createAction(
  '[Todo List] Create Todo Item',
  props<{ title: string }>()
);

export const createTodoItemSuccess = createAction(
  '[Todo List] Create Todo Item Success',
  props<{ newTodoItem: Todo }>()
);

export const clearTodos = createAction(
  '[Todo List] Clear Todos'
);

export const editTodoItem = createAction(
  '[Todo List] Edit Todo Item',
  props<{ previousTodoItem: Todo, updatedTodoItem: Todo }>()
);

export const editTodoItemFailure = createAction(
  '[Todo List] Edit Todo Item Failure',
  props<{ previousTodoItem: Todo }>()
);

export const editTodoItemSuccess = createAction(
  '[Todo List] Edit Todo Item Success'
);
