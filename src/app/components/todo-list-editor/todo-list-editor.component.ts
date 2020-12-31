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
    this.setMode();
    this.selectedTodoId$ = this.store.select(fromRouter.selectSelectedTodoId);
    this.setSelectedTodo();
  }

  setMode(): void {
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('todoId')) {
    //     this.mode = 'edit';
    //     this.selectedTodoId = paramMap.get('todoId');
    //   } else {
    //     this.mode = 'create';
    //     this.selectedTodoId = null;
    //   }
    // });
  }

  setSelectedTodo(): void {
    // this.selectedTodo$ = this.store.select(
    //   fromTodoList.selectTodoById,
    //   { id: this.selectedTodoId }
    // )
  }

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
