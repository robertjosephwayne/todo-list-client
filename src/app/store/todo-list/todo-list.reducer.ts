import { Action, createReducer, on } from '@ngrx/store';

import { TodoListState, initialState } from './todo-list.state';

import * as TodoListActions from './todo-list.actions';

const _todoListReducer = createReducer(
  initialState,

  on(TodoListActions.fetchTodoList, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),

  on(TodoListActions.fetchTodoListSuccess, (state, { todoList }) => {
    return {
      ...state,
      todos: todoList,
      isLoading: false
    };
  }),

  on(TodoListActions.fetchTodoListFailure, (state) => {
    return {
      ...state,
      isLoading: false
    }
  }),

  on(TodoListActions.deleteTodoItem, (state, { id }) => {
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
      todos: updatedTodoList,
      editingTodo: null
    };
  }),

  on(TodoListActions.startEditingTodoItem, (state, { todoItem }) => {
    return {
      ...state,
      editingTodo: todoItem
    };
  }),

  on(TodoListActions.clearTodos, (state) => {
    return {
      ...state,
      todos: []
    };
  }),

  on(TodoListActions.disableEditingMode, (state) => {
    return {
      ...state,
      editingTodo: null
    };
  })
);

export function todoListReducer(state: TodoListState, action: Action) {
  return _todoListReducer(state, action);
}
