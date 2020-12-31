import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Store } from '@ngrx/store';

import * as TodoListActions from '../../../store/todo-list/todo-list.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  viewProviders: [MatExpansionPanel]
})
export class TodoItemComponent { }
