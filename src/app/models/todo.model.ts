export type TodoId = string;

export interface Todo {
  _id: TodoId;
  isComplete: boolean;
  project: string;
  title: string;
  createdAt: Date;
}
