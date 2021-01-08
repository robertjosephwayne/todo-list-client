export type TodoId = string;

export interface Todo {
  id: TodoId;
  title: string;
  isComplete: boolean;
}
