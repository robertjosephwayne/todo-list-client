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

  markTodoItemComplete(): void {
    this.store.dispatch(
      TodoListActions.completeStatusChanged({
        id: this.id,
        previousCompleteStatus: this.isComplete,
        updatedCompleteStatus: true
      })
    );
  }

  markTodoItemIncomplete(): void {
    this.store.dispatch(
      TodoListActions.completeStatusChanged({
        id: this.id,
        previousCompleteStatus: this.isComplete,
        updatedCompleteStatus: false
      })
    );
  }

  enableEditingMode(): void {
    this.updatedTitle = this.title;
    this.updatedDesc = this.desc;
    this.editingModeActive = true;
  }

  disableEditingMode(): void {
    this.editingModeActive = false;
  }

  saveChanges(): void {
    this.saveTitleChanges();
    this.saveDescChanges();
    this.disableEditingMode();
  }

  saveTitleChanges(): void {
    if (this.title === this.updatedTitle) return;
    this.store.dispatch(
      TodoListActions.editTodoItemTitle({
        id: this.id,
        previousTitle: this.title,
        updatedTitle: this.updatedTitle
      })
    );
  }

  saveDescChanges(): void {
    if (this.desc === this.updatedDesc) return;
    this.store.dispatch(
      TodoListActions.editTodoItemDesc({
        id: this.id,
        previousDesc: this.desc,
        updatedDesc: this.updatedDesc
      })
    );
  }

  deleteTodoItem(): void {
    this.store.dispatch(TodoListActions.deleteTodoItem({ id: this.id }));
  }
}
