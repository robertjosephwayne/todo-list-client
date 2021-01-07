import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export interface TodoListState { }

const initialState: TodoListState = {};

@Injectable()
export class TodoListStore extends ComponentStore<TodoListState> {
  constructor() {
    super(initialState);
  }
}
