import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { EMPTY } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

import { NewTodo } from 'src/app/models/new-todo.model';
import { Todo } from 'src/app/models/todo.model';
import { TodoListService } from '../../../services/todo-list.service';

export interface TodoListState {
  columnsToDisplay: string[];
  editingTodo: Todo;
  isEditing: boolean;
  isLoading: boolean;
  projectNames: string[];
  selectedProject: string;
  todos: Todo[];
}

const initialState: TodoListState = {
  columnsToDisplay: ['title', 'buttons'],
  editingTodo: null,
  isEditing: false,
  isLoading: false,
  projectNames: [
    'Personal',
    'Shopping',
    'Work',
    'School',
    'Movies to watch',
  ],
  selectedProject: '',
  todos: [],
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
  readonly projectNames$ = this.select(state => state.projectNames);
  readonly selectedProject$ = this.select(state => state.selectedProject);
  readonly todos$ = this.select(state => state.todos);

  readonly createTodo = this.effect<NewTodo>((newTodos$) =>
    newTodos$.pipe(
      mergeMap((newTodo) => {
        this.setState((state) => {
          return {
            ...state,
            todos: [
              ...state.todos,
              { ...newTodo, id: '' }
            ]
          };
        });
        return this.todoListService.createTodo(newTodo).pipe(
          tap({
            next: () => {
              this.getTodos();
            },
            error: (error) => {
              this.getTodos();
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
          const updatedTodos = state.todos.filter(currentTodo => currentTodo.id !== todo.id);
          return {
            ...state,
            todos: updatedTodos
          };
        });
        return this.todoListService.deleteTodo(todo.id).pipe(
          tap({
            next: () => {
              this.getTodos();
            },
            error: (error) => {
              this.getTodos();
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
        this.setState((state) => {
          const updatedTodos = [
            ...state.todos
          ];
          const editedTodoIndex = updatedTodos.findIndex(todo => todo.id === editedTodo.id);
          updatedTodos[editedTodoIndex] = editedTodo;
          return {
            ...state,
            todos: updatedTodos
          };
        });
        return this.todoListService.editTodo(editedTodo).pipe(
          tap({
            next: () => {
              this.getTodos();
            },
            error: (error) => {
              this.getTodos();
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


  readonly setSelectedProject = this.updater((state, selectedProject: string) => {
    return {
      ...state,
      selectedProject
    };
  });

  private readonly setTodos = this.updater((state, todos: Todo[]) => {
    return {
      ...state,
      todos,
    };
  });

  readonly getTodos = this.effect((trigger$) =>
    trigger$.pipe(
      // tap(() => this.setLoading(true)),
      switchMap(() => {
        return this.todoListService.getTodos().pipe(
          tap({
            next: (todos) => {
              this.setTodos(todos);
              this.setIsLoading(false);
            },
            error: this.handleError
          }),
          catchError(() => EMPTY)
        );
      }),
    ),
  );

  private readonly handleError = (error) => {
    console.error(error);
  };
}
