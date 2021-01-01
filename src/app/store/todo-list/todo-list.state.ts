import { Todo } from 'src/app/models/todo.model';

export interface TodoListState {
  todos: Todo[];
  editingTodo: Todo;
  isLoading: boolean;
}

export const initialState: TodoListState = {
  todos: [],
  editingTodo: null,
  isLoading: false
};
