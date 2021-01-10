import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NewProject } from '../models/new-project.model';
import { NewTodo } from '../models/new-todo.model';
import { Project } from '../models/project.model';
import { Todo, TodoId } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoListService {

  constructor(private http: HttpClient) { }

  // TODO: Update request using new routes (access todo through project)
  createTodo(newTodo: NewTodo) {
    return this.http.post<Todo>('http://localhost:3000/todos', newTodo);
  }

  createProject(newProject: NewProject) {
    return this.http.post<Project>('http://localhost:3000/projects', newProject);
  }

  getTodos() {
    return this.http.get<Todo[]>('http://localhost:3000/todos');
  }

  getProjects() {
    return this.http.get<Project[]>('http://localhost:3000/projects');
  }

  // TODO: Update request using new routes (access todo through project)
  deleteTodo(todoId: TodoId) {
    // return this.http.delete(`http://localhost:3000/todos/${todoId}`);
  }

  // TODO: Update request using new routes (access todo through project)
  editTodo(updatedTodo: Todo) {
    return this.http.patch(`http://localhost:3000/todos/${updatedTodo.id}`, {
      title: updatedTodo.title,
      isComplete: updatedTodo.isComplete
    });
  }
}


