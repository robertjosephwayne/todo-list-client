import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Refactor using reactive forms
@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.css']
})
export class CreateTodoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; }
  ) { }

  ngOnInit(): void { }

  onSave(form: NgForm) {
    if (form.invalid) return;
    this.data.title = form.value.title;
    this.dialogRef.close(this.data);
  }

}
