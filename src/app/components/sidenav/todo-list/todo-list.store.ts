import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { NewProject } from 'src/app/models/new-project.model';
import { NewTodo } from 'src/app/models/new-todo.model';
import { Project } from 'src/app/models/project.model';
import { Todo } from 'src/app/models/todo.model';
import { TodoListService } from '../../../services/todo-list.service';

export interface TodoListState {
  columnsToDisplay: string[];
  editingTodo: Todo;
  isEditing: boolean;
  isLoading: boolean;
  projects: Project[];
  selectedProjectId: string;
}

const initialState: TodoListState = {
  columnsToDisplay: ['title', 'buttons'],
  editingTodo: null,
  isEditing: false,
  isLoading: false,
  projects: [],
  selectedProjectId: '',
};

@Injectable()
export class TodoListStore extends ComponentStore<TodoListState> {
  constructor(private readonly todoListService: TodoListService) {
    super(initialState);
  }

  // Selectors

  readonly columnsToDisplay$ = this.select(state => state.columnsToDisplay);
  readonly editingTodo$ = this.select(state => state.editingTodo);
  readonly isEditing$ = this.select(state => state.isEditing);
  readonly isLoading$ = this.select(state => state.isLoading);
  readonly projects$ = this.select(state => state.projects);
  readonly selectedProjectId$ = this.select(state => state.selectedProjectId);

  readonly inboxProject$ = this.select(
    this.projects$,
    (projects) => projects.find(project => project.name === 'Inbox')
  );

  readonly customProjects$ = this.select(
    this.projects$,
    this.inboxProject$,
    (projects, inboxProject) => projects.filter(project => project.id !== inboxProject.id)
  );

  readonly inboxSelected$ = this.select(
    this.selectedProjectId$,
    this.inboxProject$,
    (selectedProjectId, inboxProject) => {
      if (!selectedProjectId || !inboxProject) return false;
      return selectedProjectId === inboxProject.id;
    }
  );

  private readonly selectedProject$ = this.select(
    this.projects$,
    this.selectedProjectId$,
    (projects, selectedProjectId) => {
      const selectedProject = projects.find(project => project.id === selectedProjectId);
      return selectedProject || projects[0];
    }
  );

  readonly selectedProjectName$ = this.select(
    this.selectedProject$,
    (selectedProject) => selectedProject.name
  );

  readonly selectedProjectTodos$ = this.select(
    this.selectedProject$,
    (selectedProject) => this.getProjectTodos(selectedProject)
  );

  readonly selectedProjectTodoCount$ = this.select(
    this.selectedProjectTodos$,
    (selectedProjectTodos) => selectedProjectTodos.length
  );

  // Updaters

  readonly setInboxSelected = this.updater((state) => {
    const inboxProject: Project = state.projects.find(project => project.name === 'Inbox');
    return {
      ...state,
      selectedProjectId: inboxProject.id
    };
  });

  readonly setIsEditing = this.updater((state, isEditing: boolean) => {
    return {
      ...state,
      isEditing
    };
  });

  readonly setIsLoading = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading,
    };
  });

  readonly setProjects = this.updater((state, projects: Project[]) => {
    return {
      ...state,
      projects
    };
  });

  readonly setSelectedProjectId = this.updater((state, selectedProjectId: string) => {
    return {
      ...state,
      selectedProjectId
    };
  });

  // Effects

  readonly createProject = this.effect<NewProject>((newProjects$) =>
    newProjects$.pipe(
      mergeMap((newProject) => {
        this.setState((state) => {
          return {
            ...state,
            projects: [
              ...state.projects,
              { ...newProject, id: '', todos: [] }
            ]
          };
        });
        return this.todoListService.createProject(newProject).pipe(
          tap({
            next: () => {
              this.getProjects();
            },
            error: (error) => {
              this.getProjects();
              return this.handleError(error);
            }
          }),
          catchError(() => EMPTY)
        );
      }),
    ),
  );

  readonly createTodo = this.effect<NewTodo>((newTodos$) =>
    newTodos$.pipe(
      mergeMap((newTodo) => {
        this.setState((state) => {
          const selectedProject = this.getProjectById(state.projects, newTodo.projectId);
          const updatedTodos = [...this.getProjectTodos(selectedProject)];
          updatedTodos.push({ ...newTodo, id: '' });

          const updatedProject = {
            ...selectedProject,
            todos: updatedTodos
          };

          const updatedProjects = [...state.projects].map(project => {
            if (project.id === updatedProject.id) return updatedProject;
            return project;
          });

          return {
            ...state,
            projects: updatedProjects
          };
        });

        return this.todoListService.createTodo(newTodo).pipe(
          tap({
            next: () => {
              this.getProjects();
            },
            error: (error) => {
              this.getProjects();
              return this.handleError(error);
            }
          }),
          catchError(() => EMPTY)
        );
      }),
    ),
  );

  readonly deleteTodo = this.effect<Todo>((todos$) =>
    todos$.pipe(
      mergeMap((todo) => {
        this.setState((state) => {
          const selectedProject = this.getProjectById(state.projects, todo.projectId);
          const selectedProjectTodos = this.getProjectTodos(selectedProject);
          const updatedTodos = selectedProjectTodos.filter(currentTodo => currentTodo.id !== todo.id);

          const updatedProject = {
            ...selectedProject,
            todos: updatedTodos
          };

          const updatedProjects = [...state.projects].map(project => {
            if (project.id === updatedProject.id) return updatedProject;
            return project;
          });

          return {
            ...state,
            projects: updatedProjects
          };
        });

        return this.todoListService.deleteTodo(todo).pipe(
          tap({
            next: () => {
              this.getProjects();
            },
            error: (error) => {
              this.getProjects();
              return this.handleError(error);
            }
          }),
          catchError(() => EMPTY)
        );
      }),
    ),
  );

  // TODO: Fix ordering of optimistic vs. backend update
  readonly editTodo = this.effect<Todo>((editedTodos$) =>
    editedTodos$.pipe(
      mergeMap((editedTodo) => {
        this.setState((state) => {
          const currentProject = this.getProjectByTodoId(state.projects, editedTodo.id);
          const updatedCurrentProject = this.removeTodoFromProject(currentProject, editedTodo);

          const newProject = this.getProjectById(state.projects, editedTodo.projectId);
          const updatedNewProjectTodos = [...this.getProjectTodos(newProject)];

          let editedTodoIndex = updatedNewProjectTodos.findIndex(todo => todo.id === editedTodo.id);
          if (editedTodoIndex === -1) {
            updatedNewProjectTodos.push(editedTodo);
            editedTodoIndex = updatedNewProjectTodos.length - 1;
          }

          updatedNewProjectTodos[editedTodoIndex] = editedTodo;
          const updatedNewProject = {
            ...newProject,
            todos: updatedNewProjectTodos
          };

          const updatedProjects = [...state.projects].map(project => {
            if (project.id === updatedNewProject.id) return updatedNewProject;
            if (project.id === updatedCurrentProject.id) return updatedCurrentProject;
            return project;
          });

          return {
            ...state,
            projects: updatedProjects
          };
        });

        return this.todoListService.editTodo(editedTodo).pipe(
          tap({
            next: () => {
              this.getProjects();
            },
            error: (error) => {
              this.getProjects();
              return this.handleError(error);
            }
          }),
          catchError(() => EMPTY)
        );
      }),
    ),
  );

  readonly getProjects = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() => {
        return this.todoListService.getProjects().pipe(
          tap({
            next: (projects) => {
              this.setProjects(projects);
              this.setIsLoading(false);
            },
            error: this.handleError
          }),
          catchError(() => EMPTY)
        );
      }),
    ),
  );

  readonly initializeProjects = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      switchMap(() => {
        return this.todoListService.getProjects().pipe(
          tap({
            next: (projects) => {
              this.setProjects(projects);
              this.setInboxSelected();
              this.setIsLoading(false);
            },
            error: this.handleError
          }),
          catchError(() => EMPTY)
        );
      }),
    ),
  );

  // TODO: Clear projects when a user logs out

  // Helpers

  private readonly handleError = (error) => {
    console.error(error);
  };

  private readonly getProjectById = (projects: Project[], projectId): Project => {
    return projects.find(project => project.id === projectId);
  };

  private readonly getProjectByTodoId = (projects: Project[], todoId: string): Project => {
    return projects.find(project => {
      const todos = this.getProjectTodos(project);
      for (let todo of todos) {
        if (todo.id === todoId) return true;
      }
      return false;
    });
  };

  private readonly getProjectTodos = (project: Project): Todo[] => {
    if (!project?.todos) return [];
    return project.todos;
  };

  private readonly removeTodoFromProject = (project: Project, todo: Todo): Project => {
    const todos = this.getProjectTodos(project);
    const updatedTodos = todos.filter(currentTodo => currentTodo.id !== todo.id);
    return {
      ...project,
      todos: updatedTodos
    };
  };


}
