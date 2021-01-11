import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewProject } from '../models/new-project.model';
import { NewTodo } from '../models/new-todo.model';
import { Project } from '../models/project.model';
import { Todo } from '../models/todo.model';


@Injectable({ providedIn: 'root' })
export class TodoListService {

  constructor(private http: HttpClient) { }

  createProject(newProject: NewProject) {
    return this.http.post<Project>('http://localhost:3000/projects', newProject);
  }

  createTodo(newTodo: NewTodo) {
    return this.http.post<Todo>(`http://localhost:3000/projects/${newTodo.projectId}/todos`, newTodo);
  }

  deleteTodo(todo: Todo) {
    return this.http.delete(`http://localhost:3000/projects/${todo.projectId}/todos?where[id]=${todo.id}`);
  }

  editTodo(updatedTodo: Todo) {
    return this.http.patch(`http://localhost:3000/todos/${updatedTodo.id}`, {
      title: updatedTodo.title,
      isComplete: updatedTodo.isComplete,
      projectId: updatedTodo.projectId
    });
  }

  // getTodos() {
  //   return this.http.get<Todo[]>('http://localhost:3000/todos');
  // }

  getProjects() {
    return this.http.get<Project[]>('http://localhost:3000/projects?filter[include][][relation]=todos');
  }

}


