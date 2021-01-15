import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.css']
})
export class NewProjectDialogComponent implements OnInit {
  maxProjectNameLength = 15;

  projectNameControlValidators = [
    Validators.required,
    Validators.maxLength(this.maxProjectNameLength)
  ];
  projectNameControlConfig = {
    validators: this.projectNameControlValidators
  };
  newProjectForm = this.fb.group({
    projectName: ['', this.projectNameControlConfig]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewProjectDialogComponent>
  ) { }

  ngOnInit(): void { }

  onSave() {
    this.dialogRef.close(this.newProjectForm.value.projectName);
  }

  get projectName() {
    return this.newProjectForm.get('projectName');
  }

}
