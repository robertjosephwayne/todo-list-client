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

  on(TodoListActions.completeStatusChangedSuccess, (state, { id, isComplete }) => {
    const todoItemIndex = state.todos.findIndex(todo => todo.id === id);
    const todoItem = state.todos[todoItemIndex];
    const updatedTodoItem = {
      ...todoItem,
      isComplete
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

  on(TodoListActions.editTodoItemDesc, (state, { id, previousDesc, updatedDesc }) => {
    const todoItemIndex = state.todos.findIndex(todo => todo.id === id);
    const todoItem = state.todos[todoItemIndex];
    const updatedTodoItem = {
      ...todoItem,
      desc: updatedDesc
    };
    const updatedTodoList = [...state.todos];
    updatedTodoList[todoItemIndex] = updatedTodoItem;
    return {
      ...state,
      todos: updatedTodoList
    };
  }),

  on(TodoListActions.editTodoItemDescFailure, (state, { id, previousDesc }) => {
    const todoItemIndex = state.todos.findIndex(todo => todo.id === id);
    const todoItem = state.todos[todoItemIndex];
    const updatedTodoItem = {
      ...todoItem,
      desc: previousDesc
    };
    const updatedTodoList = [...state.todos];
    updatedTodoList[todoItemIndex] = updatedTodoItem;
    return {
      ...state,
      todos: updatedTodoList
    };
  }),

);

export function todoListReducer(state: TodoListState, action: Action) {
  return _todoListReducer(state, action);
}
