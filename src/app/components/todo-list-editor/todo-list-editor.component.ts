import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as TodoListActions from '../../store/todo-list/todo-list.actions';

@Component({
  selector: 'app-todo-list-editor',
  templateUrl: './todo-list-editor.component.html',
  styleUrls: ['./todo-list-editor.component.css']
})
export class TodoListEditorComponent implements OnInit {
  title: string = "";
  description: string = "";

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  createTodo(): void {
  createTodo(form: NgForm): void {
    if (form.invalid) return;
    this.store.dispatch(TodoListActions.createTodoItem({
      title: form.value.title,
      description: form.value.description
    }));
    form.resetForm();
  }

  clearTitle(form: NgForm): void {
    // TODO
  }

  clearDescription(form: NgForm): void {
    // TODO
  }
}
