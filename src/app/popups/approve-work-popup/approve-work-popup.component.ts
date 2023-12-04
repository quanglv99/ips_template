import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MyWorkModel } from 'src/app/shared/my-work';
import { WORK_STATES } from 'src/app/shared/my-work-states';
import { StepProgressComponent } from 'src/app/shared/step-progress/step-progress.component';
import { WorkForMeDetailPopupComponent } from '../work-for-me-detail-popup/work-for-me-detail-popup.component';

@Component({
  selector: 'app-approve-work-popup',
  standalone: true,
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
    ReactiveFormsModule,],
  templateUrl: './approve-work-popup.component.html',
  styleUrls: ['./approve-work-popup.component.scss']
})
export class ApproveWorkPopupComponent {
  updateWorkForm!: FormGroup;
  currentStep!: number;
  status = WORK_STATES;
  isDisable: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MyWorkModel,
    private dialogRef: MatDialogRef<WorkForMeDetailPopupComponent>,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.currentStep = this.data.status.id;

    this.initializeForm();
  }

  initializeForm() {
    this.updateWorkForm = this.formBuilder.group({
      branchname: [{ value: this.data.branchname, disabled: this.isDisable }],
      member: [{ value: this.data.member, disabled: this.isDisable }],
      owner: [{ value: this.data.owner, disabled: this.isDisable }],
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


