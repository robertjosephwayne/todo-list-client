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
    (projects, selectedProjectId) => projects.find(project => project.id === selectedProjectId)
  );

  readonly selectedProjectName$ = this.select(
    this.selectedProject$,
    (selectedProject) => selectedProject.name
  );

  readonly selectedProjectTodos$ = this.select(
    this.selectedProject$,
    (selectedProject) => {
      if (!selectedProject) return [];
      return selectedProject.todos;
    }
  );

  readonly createTodo = this.effect<NewTodo>((newTodos$) =>
    newTodos$.pipe(
      mergeMap((newTodo) => {
        this.setState((state) => {
          return {
            ...state,
            // TODO: Fix optimistic updating
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

  readonly deleteTodo = this.effect<Todo>((todos$) =>
    todos$.pipe(
      mergeMap((todo) => {
        // TODO: Fix optimistic updating
        // this.setState((state) => {
        //   const updatedTodos = state.todos.filter(currentTodo => currentTodo.id !== todo.id);
        //   return {
        //     ...state,
        //     todos: updatedTodos
        //   };
        // });
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

  readonly editTodo = this.effect<Todo>((editedTodos$) =>
    editedTodos$.pipe(
      mergeMap((editedTodo) => {
        // TODO: Fix optimistic updating
        // this.setState((state) => {
        //   const updatedTodos = [
        //     ...state.todos
        //   ];
        //   const editedTodoIndex = updatedTodos.findIndex(todo => todo.id === editedTodo.id);
        //   updatedTodos[editedTodoIndex] = editedTodo;
        //   return {
        //     ...state,
        //     todos: updatedTodos
        //   };
        // });
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

  readonly setIsLoading = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading,
    };
  });

  readonly setIsEditing = this.updater((state, isEditing: boolean) => {
    return {
      ...state,
      isEditing
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

  readonly setInboxSelected = this.updater((state) => {
    const inboxProject: Project = state.projects.find(project => project.name === 'Inbox');
    return {
      ...state,
      selectedProjectId: inboxProject.id
    };
  });

  // private readonly setTodos = this.updater((state, todos: Todo[]) => {
  //   return {
  //     ...state,
  //     todos,
  //   };
  // });

  // readonly getTodos = this.effect((trigger$) =>
  //   trigger$.pipe(
  //     switchMap(() => {
  //       return this.todoListService.getTodos().pipe(
  //         tap({
  //           next: (todos) => {
  //             this.setTodos(todos);
  //           },
  //           error: this.handleError
  //         }),
  //         catchError(() => EMPTY)
  //       );
  //     }),
  //   ),
  // );

  readonly initializeProjects = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      switchMap(() => {
        return this.todoListService.getProjects().pipe(
          tap({
            next: (projects) => {
              this.setProjects(projects);
              this.setInboxSelected();
              this.setIsLoading(false)
            },
            error: this.handleError
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

  // TODO: Clear projects when a user logs out

  private readonly handleError = (error) => {
    console.error(error);
  };
}
