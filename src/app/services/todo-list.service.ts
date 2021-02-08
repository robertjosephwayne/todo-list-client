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
    return this.http.post<Project>('https://todo-list-api-nest.herokuapp.com/projects', newProject);
  }

  createTodo(newTodo: NewTodo) {
    return this.http.post<Todo>(`https://todo-list-api-nest.herokuapp.com/todos`, newTodo);
  }

  deleteProject(project: Project) {
    return this.http.delete(`https://todo-list-api-nest.herokuapp.com/projects/${project._id}`);
  }

  deleteTodo(todo: Todo) {
    return this.http.delete(`https://todo-list-api-nest.herokuapp.com/todos/${todo._id}`);
  }

  editTodo(updatedTodo: Todo) {
    return this.http.put(`https://todo-list-api-nest.herokuapp.com/todos/${updatedTodo._id}`, {
      title: updatedTodo.title,
      isComplete: updatedTodo.isComplete,
      project: updatedTodo.project
    });
  }

  editProject(updatedProject: Project) {
    return this.http.put(`https://todo-list-api-nest.herokuapp.com/projects/${updatedProject._id}`, {
      name: updatedProject.name
    });
  }

  getProjects() {
    return this.http.get<Project[]>(`https://todo-list-api-nest.herokuapp.com/projects`);
  }
}


