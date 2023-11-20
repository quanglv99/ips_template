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
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { AssignModel } from 'src/app/shared/assign';
import { MatStepperModule } from '@angular/material/stepper';
import { MY_DATE_FORMATS } from '../../shared/custom-date'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { StepProgressComponent } from "../../shared/step-progress/step-progress.component";
import { STATES } from 'src/app/shared/assign-states';
import { EMPLOYEES_LIST } from 'src/app/shared/employees-value';

@Component({
    selector: 'app-my-assign-detail-popup',
    standalone: true,
    templateUrl: './my-assign-detail-popup.component.html',
    styleUrls: ['./my-assign-detail-popup.component.scss'],
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
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        StepProgressComponent
    ],
    providers: [
      { provide: DateAdapter, useClass: NativeDateAdapter },
      { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    ],
})
export class MyAssignDetailPopupComponent implements OnInit {

  state = STATES
  currentStep!:number
  employees = EMPLOYEES_LIST
  owners = EMPLOYEES_LIST
  updateAssignForm!: FormGroup;
  isFormDirty: boolean = false;
  isDisable: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AssignModel,
    private dialogRef: MatDialogRef<MyAssignDetailPopupComponent>,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.currentStep = this.data.status.id
    if (this.data.status.id !== 1 && this.data.status.id !== 2 ) {
      this.isDisable = true;
    }
    
    this.updateAssignForm = this.formBuilder.group({
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

    this.updateAssignForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.updateAssignForm.dirty;
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
