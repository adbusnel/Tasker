import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardState } from '../../../models/state.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskerDialogData } from '../../../models/task.model';
import { MatSelectModule } from '@angular/material/select';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-creation-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './creation-dialog.component.html',
  styleUrl: './creation-dialog.component.scss'
})
export class CreationDialogComponent implements OnInit {
  public form: any;
  public states: CardState[] = Object.values(CardState) || [];

  constructor(
    private dialogRef: MatDialogRef<CreationDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: TaskerDialogData
  ) { }

  ngOnInit(): void {
    const editMode = this.data.mode === 'edit';
    this.form = this.fb.group({
      title: [editMode ? this.data.data?.title : '', Validators.required],
      description: [editMode ? this.data.data?.description : '', Validators.required],
      status: [editMode ? this.data.data?.status : this.data.status || this.states[0], Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      let data = {
        _id: this.data.data?._id,
        title: this.form.value.title,
        description: this.form.value.description,
        status: this.form.value.status,
        projectId: ''
      };
      if (this.data.projectId) {
        data.projectId = this.data.projectId;
      }
      this.dialogRef.close({
        delete: false,
        data: data
      });
    }
  }

  delete(): void {
    this.dialogRef.close({ delete: true, data: this.data.data });
  }

  close(): void {
    this.dialogRef.close();
  }
}
