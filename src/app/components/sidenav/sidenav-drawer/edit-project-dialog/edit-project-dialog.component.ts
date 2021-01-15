import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project.model';
import { NewProjectDialogComponent } from '../new-project-dialog/new-project-dialog.component';

@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.css']
})
export class EditProjectDialogComponent implements OnInit {
  maxProjectNameLength = 15;

  projectNameControlValidators = [
    Validators.required,
    Validators.maxLength(this.maxProjectNameLength)
  ];
  projectNameControlConfig = {
    validators: this.projectNameControlValidators
  };
  editProjectForm = this.fb.group({
    projectName: [this.data.project.name, this.projectNameControlConfig]
  });

  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<NewProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project; }
  ) { }

  ngOnInit(): void {
  }

  onSave() {
    const updatedProject: Project = {
      ...this.data.project,
      name: this.editProjectForm.value.projectName
    };

    this.dialogRef.close(updatedProject);
  }

  get projectName() {
    return this.editProjectForm.get('projectName');
  }

}
