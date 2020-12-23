import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Todo } from '../../models/todo.model';

import * as TodoListActions from '../../store/todo-list/todo-list.actions';
import * as fromTodoList from '../../store/todo-list/todo-list.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todosSub: Subscription;
  columnsToDisplay = ['title', 'isComplete'];
  expandedTodo: Todo | null;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.todosSub = this.store.select(fromTodoList.selectAllTodos).subscribe(todos => {
      this.todos = todos;
    });
    this.fetchAll();
  }

  fetchAll(): void {
    this.store.dispatch(TodoListActions.fetchTodoList());
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
  }
}
