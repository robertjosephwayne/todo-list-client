import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.css']
})
export class CreateTodoDialogComponent implements OnInit {
  maxTitleLength = 35;

  todoTitleControlValidators = [
    Validators.required,
    Validators.maxLength(this.maxTitleLength)
  ];
  todoTitleControlConfig = {
    validators: this.todoTitleControlValidators
  };
  todoForm = this.fb.group({
    title: [this.data.title, this.todoTitleControlConfig]
  });

  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, projectId: string; }
  ) { }

  ngOnInit(): void { }

  onSave() {
    this.data.title = this.todoForm.value.title;
    this.dialogRef.close(this.data);
  }

  get title() {
    return this.todoForm.get('title');
  }

}
