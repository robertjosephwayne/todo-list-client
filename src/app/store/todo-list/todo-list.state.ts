import { Todo } from 'src/app/models/todo.model';

export interface TodoListState {
  todos: Todo[];
}

export const initialState: TodoListState = {
  todos: []
};
