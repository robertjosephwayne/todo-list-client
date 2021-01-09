import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.css']
})
export class NewProjectDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewProjectDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onSave(form: NgForm) {
    debugger;
    if (form.form.invalid) return;
    this.dialogRef.close(form.form.value.projectName);
  }

}