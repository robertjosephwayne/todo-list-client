import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { EMPTY } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

import { NewTodo } from 'src/app/models/new-todo.model';
import { Todo } from 'src/app/models/todo.model';
import { TodoListService } from '../../../services/todo-list.service';

export interface TodoListState {
  todos: Todo[];
  isLoading: boolean;
  isEditing: boolean;
  editingTodo: Todo;
  columnsToDisplay: string[];
}

const initialState: TodoListState = {
  todos: [],
  isLoading: false,
  isEditing: false,
  editingTodo: null,
  columnsToDisplay: ['title', 'buttons']
};

@Injectable()
export class TodoListStore extends ComponentStore<TodoListState> {
  constructor(private readonly todoListService: TodoListService) {
    super(initialState);
  }

  readonly vm$ = this.select(state => {
    return {
      todos: state.todos,
      isLoading: state.isLoading,
      isEditing: state.isEditing,
      editingTodo: state.editingTodo,
      columnsToDisplay: state.columnsToDisplay,
    };
  });

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
