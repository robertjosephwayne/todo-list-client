import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.css']
})
export class EditTodoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) { }

  ngOnInit(): void { }

  onSave(form: NgForm) {
    if (form.invalid) return;
    this.data.title = form.value.title;
    this.dialogRef.close(this.data);
  }

}
