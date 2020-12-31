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
    this.store.dispatch(TodoListActions.createTodoItem({
      title: this.title,
      description: this.description
    }));
    this.clearEditor();
  }

  clearEditor(): void {
    this.clearTitle();
    this.clearDescription();
  }

  clearTitle(): void {
    this.title = "";
  }

  clearDescription(form: NgForm): void {
    // TODO
  }
}
