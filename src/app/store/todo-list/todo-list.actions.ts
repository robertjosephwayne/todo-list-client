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
  props<{ title: string, description: string }>()
);

export const createTodoItemSuccess = createAction(
  '[Todo List] Create Todo Item Success',
  props<{ newTodoItem: Todo }>()
);

export const completeStatusChanged = createAction(
  '[Todo List] Complete Status Changed',
  props<{ id: string, previousCompleteStatus: boolean, updatedCompleteStatus: boolean }>()
);

export const completeStatusChangedFailure = createAction(
  '[Todo List] Complete Status Changed Success',
  props<{ id: string, previousCompleteStatus: boolean }>()
);

export const completeStatusChangedSuccess = createAction(
  '[Todo List] Complete Status Changed Success',
);

export const editTodoItemTitle = createAction(
  '[Todo List] Edit Todo Item Title',
  props<{ id: string, previousTitle: string, updatedTitle: string }>()
);

export const editTodoItemTitleFailure = createAction(
  '[Todo List] Edit Todo Item Title Failure',
  props<{ id: string, previousTitle: string }>()
);

export const editTodoItemTitleSuccess = createAction(
  '[Todo List] Edit Todo Item Title Success'
);

export const editTodoItemDescription = createAction(
  '[Todo List] Edit Todo Item Description',
  props<{ id: string, previousDescription: string, updatedDescription: string }>()
);

export const editTodoItemDescriptionFailure = createAction(
  '[Todo List] Edit Todo Item Description Failure',
  props<{ id: string, previousDescription: string }>()
);

export const editTodoItemDescriptionSuccess = createAction(
  '[Todo List] Edit Todo Item Description Success'
);
