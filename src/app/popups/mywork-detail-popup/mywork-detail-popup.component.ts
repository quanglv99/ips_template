import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StepProgressComponent } from '../../shared/step-progress/step-progress.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WORK_STATES } from 'src/app/shared/my-work-states';
import { MyWorkModel } from 'src/app/shared/my-work';
@Component({
  selector: 'app-mywork-detail-popup',
  standalone: true,
  templateUrl: './mywork-detail-popup.component.html',
  styleUrls: ['./mywork-detail-popup.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StepProgressComponent,
    ReactiveFormsModule,
  ],
})
export class MyworkDetailPopupComponent implements OnInit {
  state = WORK_STATES;
  currentStep!: number;

  updateWorkForm!: FormGroup;
  isFormDirty: boolean = false;
  isDisable: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MyWorkModel,
    private dialogRef: MatDialogRef<MyworkDetailPopupComponent>,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.currentStep = this.data.status.id;
    if (this.data.status.id !== 1) {
      this.isDisable = true;
    }

    this.updateWorkForm = this.formBuilder.group({
      branch: [{ value: this.data.branchname, disabled: this.isDisable }],
      member: [{ value: this.data.member, disabled: this.isDisable }],
      owner: [{ value: this.data.owner, disabled: this.isDisable }],
      startDate: [{ value: this.data.startDate, disabled: this.isDisable }],
      endDate: [{ value: this.data.endDate, disabled: this.isDisable }],
      employee: [{ value: this.data.employee, disabled: this.isDisable }],
      note: [{ value: this.data.note, disabled: this.isDisable }],
      approver: [{ value: this.data.approver, disabled: this.isDisable }],
      file: [''],
    });

    this.updateWorkForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.updateWorkForm.dirty;
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}