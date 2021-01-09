export type TodoId = string;

export interface Todo {
  id: TodoId;
  isComplete: boolean;
  projectId: string;
  title: string;
}
