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
  props<{ title: string, desc: string }>()
);

export const createTodoItemSuccess = createAction(
  '[Todo List] Create Todo Item Success',
  props<{ newTodoItem: Todo }>()
);

export const completeStatusChanged = createAction(
  '[Todo List] Complete Status Changed',
  props<{ id: string, isComplete: boolean }>()
);

export const completeStatusChangedSuccess = createAction(
  '[Todo List] Complete Status Changed Success',
  props<{ id: string, isComplete: boolean }>()
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

export const editTodoItemDesc = createAction(
  '[Todo List] Edit Todo Item Desc',
  props<{ id: string, previousDesc: string, updatedDesc: string }>()
);

export const editTodoItemDescFailure = createAction(
  '[Todo List] Edit Todo Item Desc Failure',
  props<{ id: string, previousDesc: string }>()
);

export const editTodoItemDescSuccess = createAction(
  '[Todo List] Edit Todo Item Desc Success'
);
