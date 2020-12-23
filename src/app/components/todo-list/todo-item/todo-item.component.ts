import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as TodoListActions from '../../../store/todo-list/todo-list.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() desc: string;
  @Input() isComplete: boolean;
  updatedTitle: string;
  updatedDesc: string;
  editingModeActive = false;
  detailViewActive = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  toggleCompleteStatus(): void {
    this.store.dispatch(
      TodoListActions.completeStatusChanged({
        id: this.id,
        isComplete: !this.isComplete
      })
    );
  }

  toggleEditingMode(): void {
    this.editingModeActive = !this.editingModeActive;
  }

  saveChanges(updatedTitle: string, updatedDesc: string): void {
    this.saveTitleChanges(updatedTitle);
    this.saveDescChanges(updatedDesc);
    this.editingModeActive = false;
  }

  saveTitleChanges(updatedTitle: string): void {
    const previousTitle = this.title;
    if (updatedTitle === previousTitle) return;
    this.title = updatedTitle;
    this.store.dispatch(
      TodoListActions.editTodoItemTitle({
        id: this.id,
        previousTitle,
        updatedTitle
      })
    );
  }

  saveDescChanges(updatedDesc: string): void {
    const previousDesc = this.desc;
    if (updatedDesc === previousDesc) return;
    this.desc = updatedDesc;
    this.store.dispatch(
      TodoListActions.editTodoItemDesc({
        id: this.id,
        previousDesc,
        updatedDesc
      })
    );
  }

  deleteTodoItem(): void {
    this.store.dispatch(TodoListActions.deleteTodoItem({ id: this.id }));
  }
}
