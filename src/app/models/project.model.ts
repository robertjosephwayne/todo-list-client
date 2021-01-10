import { Todo } from './todo.model';

export interface Project {
  id: string;
  name: string;
  todos: Todo[]
}
