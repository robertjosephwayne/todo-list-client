import { Todo } from './todo.model';

export interface Project {
  _id: string;
  name: string;
  todoList: Todo[];
}
