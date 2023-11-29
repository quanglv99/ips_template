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
import { MyWorkModel } from 'src/app/shared/my-work';
import { StepProgressComponent } from '../../shared/step-progress/step-progress.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WORK_STATES } from 'src/app/shared/my-work-states';

@Component({
  selector: 'app-work-for-me-detail-popup',
  standalone: true,
  templateUrl: './work-for-me-detail-popup.component.html',
  styleUrls: ['./work-for-me-detail-popup.component.scss'],
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
export class WorkForMeDetailPopupComponent implements OnInit {
  updateWorkForm!: FormGroup;
  currentStep!: number;
  status = WORK_STATES;
  isDisable: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MyWorkModel,
    private dialogRef: MatDialogRef<WorkForMeDetailPopupComponent>,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.currentStep = this.data.status.id;
    
    this.initializeForm();
  }

  initializeForm() {
    this.updateWorkForm = this.formBuilder.group({
      branchname: [{ value: this.data.branchname, disabled: this.isDisable }],
      member: [{ value: this.data.member, disabled: this.isDisable }],
      owner: [{ value: this.data.owner , disabled: this.isDisable }],
      startDate: [{ value: this.data.startDate, disabled: this.isDisable }],
      endDate: [{ value: this.data.endDate, disabled: this.isDisable }],
      employee: [{ value: this.data.employee, disabled: this.isDisable }],
      note: [{ value: this.data.note, disabled: this.isDisable }],
      approver: [{ value: this.data.approver, disabled: this.isDisable }],
      createdDate: [this.data.createdDate],
      createdUser: [this.data.createdUser],
      updatedDate: [new Date()],
      updatedUser: ['QuangLV'],
      status: [''],
    });
  }
  onClose() {
    this.dialogRef.close();
  }
}
