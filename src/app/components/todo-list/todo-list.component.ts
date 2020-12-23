import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  columnsToDisplay = ['select', 'title', 'isComplete'];
  expandedTodo: Todo | null;
  selection: SelectionModel<Todo>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.todosSub = this.store.select(fromTodoList.selectAllTodos).subscribe(todos => {
      this.todos = todos;
    });
    this.fetchAll();
    this.setSelection();
  }

  setSelection(): void {
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Todo>(allowMultiSelect, initialSelection);
  }

  fetchAll(): void {
    this.store.dispatch(TodoListActions.fetchTodoList());
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.todos.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.todos.forEach(row => this.selection.select(row));
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe();
  }
}
