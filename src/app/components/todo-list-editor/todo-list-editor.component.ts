import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';

import * as fromRouter from '../../store/router/router.selectors';
import * as fromTodoList from '../../store/todo-list/todo-list.selectors';
import * as TodoListActions from '../../store/todo-list/todo-list.actions';

@Component({
  selector: 'app-todo-list-editor',
  templateUrl: './todo-list-editor.component.html',
  styleUrls: ['./todo-list-editor.component.css']
})
export class TodoListEditorComponent implements OnInit {
  editingTodo: Todo;
  editingTodoSub: Subscription;
  isEditing: boolean;
  isEditingSub: Subscription;

  constructor(
    private store: Store,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.editingTodoSub = this.store.select(fromTodoList.selectEditingTodo).subscribe(editingTodo => {
      this.editingTodo = editingTodo;
    });

    this.isEditingSub = this.store.select(fromTodoList.selectIsEditing).subscribe(isEditing => {
      this.isEditing = isEditing;
    })
  }

  onSave(form: NgForm) {
    if (form.invalid) return;
    const title = form.value.title;
    if (this.isEditing) {
      this.saveChanges(title);
    } else {
      this.createTodo(title);
    }
  }

  createTodo(title: string): void {
    this.store.dispatch(TodoListActions.createTodoItem({
      title
    }));
  }

  saveChanges(updatedTitle: string) {
    const updatedTodoItem = {
      ...this.editingTodo,
      title: updatedTitle
    };
    this.store.dispatch(
      TodoListActions.editTodoItem({
        previousTodoItem: this.editingTodo,
        updatedTodoItem
      })
    );
  }

  ngOnDestroy(): void {
    this.editingTodoSub.unsubscribe();
    this.isEditingSub.unsubscribe();
    if (this.isEditing) this.store.dispatch(TodoListActions.disableEditingMode());
  }
}
