// Refactor using reactive forms
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project.model';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.css']
})
export class EditTodoDialogComponent implements OnInit {
  maxTitleLength = 35;

  todoTitleControlValidators = [
    Validators.required,
    Validators.maxLength(this.maxTitleLength)
  ];
  todoTitleControlConfig = {
    validators: this.todoTitleControlValidators
  };
  todoForm = this.fb.group({
    title: [this.data.todo.title, this.todoTitleControlConfig],
    projectId: [this.data.todo.project]
  });

  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { todo: Todo, projects: Project[]; }
  ) { }

  ngOnInit(): void { }

  onSave() {
    this.dialogRef.close(this.todoForm.value);
  }

  get title() {
    return this.todoForm.get('title');
  }

  get projectId() {
    return this.todoForm.get('projectId');
  }

}
