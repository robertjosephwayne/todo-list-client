import { Action, createReducer, on } from '@ngrx/store';

import { TodoListState, initialState } from './todo-list.state';

import * as TodoListActions from './todo-list.actions';

const _todoListReducer = createReducer(
  initialState,

  on(TodoListActions.fetchTodoListSuccess, (state, { todoList }) => {
    return {
      ...state,
      todos: todoList
    };
  }),

  on(TodoListActions.deleteTodoItemSuccess, (state, { id }) => {
    const updatedTodoList = state.todos.filter(todo => todo.id !== id);
    return {
      ...state,
      todos: updatedTodoList
    };
  }),

  on(TodoListActions.createTodoItemSuccess, (state, { newTodoItem }) => {
    const updatedTodoList = [...state.todos];
    updatedTodoList.push(newTodoItem);
    return {
      ...state,
      todos: updatedTodoList
    };
  }),

  on(TodoListActions.editTodoItem, (state, { previousTodoItem, updatedTodoItem }) => {
    const todoItemIndex = state.todos.findIndex(todo => todo.id === previousTodoItem.id);
    const updatedTodoList = [...state.todos];
    updatedTodoList[todoItemIndex] = updatedTodoItem;
    return {
      ...state,
      todos: updatedTodoList
    };
  }),

  on(TodoListActions.clearTodos, (state) => {
    return {
      ...state,
      todos: []
    };
  }),
);

export function todoListReducer(state: TodoListState, action: Action) {
  return _todoListReducer(state, action);
}
