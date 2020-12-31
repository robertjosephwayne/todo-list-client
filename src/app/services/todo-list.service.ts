import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

import { AppState } from '../store/app.state';

import * as TodoListActions from '../store/todo-list/todo-list.actions';

@Injectable({ providedIn: 'root' })
export class TodoListService {
  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
  ) { }

  fetchTodoList(): void {
    this.http.get<Todo[]>('http://localhost:3000/todos')
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(todoList => {
        this.store.dispatch(TodoListActions.fetchTodoListSuccess({ todoList }));
      });
  }

  deleteTodoItem(id: string): void {
    this.http.delete(`http://localhost:3000/todos/${id}`)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(() => {
        this.store.dispatch(TodoListActions.deleteTodoItemSuccess({ id }))
      });
  }

  createTodoItem(title: string, description: string): void {
    const newTodoItem = {
      title,
      description,
      isComplete: false
    };

    this.http.post<Todo>('http://localhost:3000/todos', newTodoItem)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((newTodoItem) => {
        this.store.dispatch(TodoListActions.createTodoItemSuccess({ newTodoItem }))
      });
  }

  editTodoItem(previousTodoItem: Todo, updatedTodoItem: Todo) {
    const id = previousTodoItem.id;
    this.http.patch(`http://localhost:3000/todos/${id}`, {
      title: updatedTodoItem.title,
      description: updatedTodoItem.description,
      isComplete: updatedTodoItem.isComplete
    })
      .pipe(
        catchError((error) => {
          this.store.dispatch(
            TodoListActions.editTodoItemFailure({ previousTodoItem })
          );
          return this.handleError(error);
        })
      )
      .subscribe(() => {
        this.store.dispatch(
          TodoListActions.editTodoItemSuccess()
        )
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}


