import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';

import * as TodoListActions from '../../store/todo-list/todo-list.actions';
import * as fromTodoList from '../../store/todo-list/todo-list.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.todos$ = this.store.select(fromTodoList.selectAllTodos);
    this.fetchAll();
  }

  fetchAll(): void {
    this.store.dispatch(TodoListActions.fetchTodoList());
  }
}
