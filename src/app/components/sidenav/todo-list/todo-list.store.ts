import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { EMPTY } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

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

  readonly createTodo = this.effect<string>((titles$) =>
    titles$.pipe(
      mergeMap((title) => this.todoListService.createTodo(title).pipe(
        tap({
          next: () => {
            this.getTodos();
          },
          error: () => {
            // Handle error
          }
        }),
        catchError(() => EMPTY)
      )),
    ),
  );

  readonly deleteTodo = this.effect<string>((ids$) =>
    ids$.pipe(
      mergeMap((id) => this.todoListService.deleteTodo(id).pipe(
        tap({
          next: () => {
            this.getTodos();
          },
          error: () => {
            // Handle error
          }
        }),
        catchError(() => EMPTY)
      )),
    ),
  );

  readonly editTodo = this.effect<Todo>((todos$) =>
    todos$.pipe(
      mergeMap((todo) => this.todoListService.editTodo(todo).pipe(
        tap({
          next: () => {
            this.getTodos();
          },
          error: () => {
            // Handle error
          }
        }),
        catchError(() => EMPTY)
      )),
    ),
  );

  private readonly setLoading = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading,
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
      tap(() => this.setLoading(true)),
      switchMap(() => {
        return this.todoListService.getTodos().pipe(
          tap({
            next: (todos) => {
              this.setTodos(todos);
              this.setLoading(false);
            },
            error: () => {
              // Handle error
            }
          }),
          catchError(() => EMPTY)
        );
      }),
    ),
  );
}
