import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
  selectedTodoId: string;
  selectedTodoIdSub: Subscription;
  todos: Todo[];
  todosSub: Subscription;
  selectedTodo: Todo;
  isLoading = true;

  constructor(
    private store: Store,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.todosSub = this.store.select(fromTodoList.selectAllTodos).subscribe(todos => {
      this.todos = todos;
    })

    this.selectedTodoIdSub = this.store.select(fromRouter.selectSelectedTodoId).subscribe(selectedTodoId => {
      this.selectedTodoId = selectedTodoId;
      this.setSelectedTodo();
    });
  }

  setSelectedTodo() {
    this.selectedTodo = this.todos.find(todo => todo.id === this.selectedTodoId);
  }

  onSave(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    const title = form.value.title;
    const description = form.value.description;
    if (this.selectedTodo) {
      this.saveChanges(title, description);
    } else {
      this.createTodo(title, description);
    }
    form.resetForm();
  }

  createTodo(title: string, description: string): void {
    this.store.dispatch(TodoListActions.createTodoItem({
      title,
      description
    }));
  }

  saveChanges(updatedTitle: string, updatedDescription: string) {
    const updatedTodoItem = {
      ...this.selectedTodo,
      title: updatedTitle,
      description: updatedDescription
    };
    this.store.dispatch(
      TodoListActions.editTodoItem({
        previousTodoItem: this.selectedTodo,
        updatedTodoItem
      })
    );
  }

  ngOnDestroy(): void {
    this.selectedTodoIdSub.unsubscribe();
    this.todosSub.unsubscribe();
  }
}
