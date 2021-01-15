// Refactor using reactive forms
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project.model';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.css']
})
export class EditTodoDialogComponent implements OnInit {
  selectedProjectId: string;

  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { todo: Todo, projects: Project[]; }
  ) { }

  ngOnInit(): void {
    this.setSelectedProjectId();
  }

  onSave(form: NgForm) {
    if (form.invalid) return;
    const result = {
      title: form.value.title,
      projectId: form.value.projectId
    };
    this.dialogRef.close(result);
  }

  setSelectedProjectId(): void {
    const selectedProject = this.data.projects.find(project => {
      return project.id === this.data.todo.projectId;
    });
    this.selectedProjectId = selectedProject.id;
  }

}
