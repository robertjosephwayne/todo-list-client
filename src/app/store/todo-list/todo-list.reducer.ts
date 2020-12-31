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

  on(TodoListActions.completeStatusChanged, (state, { id, previousCompleteStatus, updatedCompleteStatus }) => {
    const todoItemIndex = state.todos.findIndex(todo => todo.id === id);
    const todoItem = state.todos[todoItemIndex];
    const updatedTodoItem = {
      ...todoItem,
      isComplete: updatedCompleteStatus
    };
    const updatedTodoList = [...state.todos];
    updatedTodoList[todoItemIndex] = updatedTodoItem;
    return {
      ...state,
      todos: updatedTodoList
    };
  }),

  on(TodoListActions.completeStatusChangedFailure, (state, { id, previousCompleteStatus }) => {
    const todoItemIndex = state.todos.findIndex(todo => todo.id === id);
    const todoItem = state.todos[todoItemIndex];
    const updatedTodoItem = {
      ...todoItem,
      isComplete: previousCompleteStatus
    };
    const updatedTodoList = [...state.todos];
    updatedTodoList[todoItemIndex] = updatedTodoItem;
    return {
      ...state,
      todos: updatedTodoList
    };
  }),

  on(TodoListActions.editTodoItemTitle, (state, { id, previousTitle, updatedTitle }) => {
    const todoItemIndex = state.todos.findIndex(todo => todo.id === id);
    const todoItem = state.todos[todoItemIndex];
    const updatedTodoItem = {
      ...todoItem,
      title: updatedTitle
    };
    const updatedTodoList = [...state.todos];
    updatedTodoList[todoItemIndex] = updatedTodoItem;
    return {
      ...state,
      todos: updatedTodoList
    };
  }),

  on(TodoListActions.editTodoItemTitleFailure, (state, { id, previousTitle }) => {
    const todoItemIndex = state.todos.findIndex(todo => todo.id === id);
    const todoItem = state.todos[todoItemIndex];
    const updatedTodoItem = {
      ...todoItem,
      title: previousTitle
    };
    const updatedTodoList = [...state.todos];
    updatedTodoList[todoItemIndex] = updatedTodoItem;
    return {
      ...state,
      todos: updatedTodoList
    };
  }),

  on(TodoListActions.editTodoItemDescription, (state, { id, previousDescription, updatedDescription }) => {
    const todoItemIndex = state.todos.findIndex(todo => todo.id === id);
    const todoItem = state.todos[todoItemIndex];
    const updatedTodoItem = {
      ...todoItem,
      description: updatedDescription
    };
    const updatedTodoList = [...state.todos];
    updatedTodoList[todoItemIndex] = updatedTodoItem;
    return {
      ...state,
      todos: updatedTodoList
    };
  }),

  on(TodoListActions.editTodoItemDescriptionFailure, (state, { id, previousDescription }) => {
    const todoItemIndex = state.todos.findIndex(todo => todo.id === id);
    const todoItem = state.todos[todoItemIndex];
    const updatedTodoItem = {
      ...todoItem,
      description: previousDescription
    };
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
