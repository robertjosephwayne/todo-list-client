import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-list-editor',
  templateUrl: './todo-list-editor.component.html',
  styleUrls: ['./todo-list-editor.component.css']
})
export class TodoListEditorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TodoListEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, isEditing: boolean }
  ) { }

  ngOnInit(): void { }

  onSave(form: NgForm) {
    if (form.invalid) return;
    this.data.title = form.value.title;
    this.dialogRef.close(this.data);
  }
}
