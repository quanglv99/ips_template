import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { ASSIGN_STATUS } from 'src/app/shared/assign-status';
import { MEMBER_LIST } from 'src/app/shared/member-value';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { ImagePopupComponent } from 'src/app/shared/image-popup/image-popup.component';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

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
        StepProgressComponent,
        MatDialogModule,
        NgToastModule,
    ],
    providers: [
      { provide: DateAdapter, useClass: NativeDateAdapter },
      { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    ],
})
export class MyAssignDetailPopupComponent implements OnInit {

  currentStep!:number
  employees :any
  owners :any
  updateAssignForm!: FormGroup;
  isFormDirty: boolean = false;
  isDisable: boolean = false;
  status = ASSIGN_STATUS;
  members = MEMBER_LIST;
  base64Image!:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AssignModel,
    private dialogRef: MatDialogRef<MyAssignDetailPopupComponent>,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
    private dialog: MatDialog,
    private toast: NgToastService,
  ) {}
  ngOnInit(): void {
    this.initData();
    this.currentStep = this.data.status.id;
    if (this.data.status.id !== 1 && this.data.status.id !== 2) {
      this.isDisable = true;
    }
    this.initializeForm();
  }

  onClick(): void {
    const dialogRef = this.dialog.open(ImagePopupComponent, {
      data: this.data.file
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  initializeForm() {
    this.updateAssignForm = this.formBuilder.group({
      branchname: [{ value: this.data.branchname, disabled: this.isDisable }],
      member: [
        this.data.member ? this.data.member.id : null,
        { value: this.data.member, disabled: this.isDisable },
      ],
      owner: [
        this.data.owner ? this.data.owner.id : null,
        { value: this.data.owner },
      ],
      startDate: [{ value: this.data.startDate, disabled: this.isDisable }],
      endDate: [{ value: this.data.endDate, disabled: this.isDisable }],
      employee: [
        this.data.employee ? this.data.employee.id : null,
        { value: this.data.employee},
      ],
      note: [{ value: this.data.note, disabled: this.isDisable }],
      approver: [{ value: this.data.approver, disabled: this.isDisable }],
      createdDate: [this.data.createdDate],
      createdUser: [this.data.createdUser],
      updatedDate: [new Date()],
      updatedUser: ['QuangLV'],
      file: [{value: '', disabled: this.isDisable}],
      status: [''],
    });
    if (this.data.status.id !== 1 && this.data.status.id !== 2) {
      this.updateAssignForm.get('owner')?.disable();
      this.updateAssignForm.get('employee')?.disable();
      this.updateAssignForm.get('member')?.disable();
    }
    this.updateAssignForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.updateAssignForm.dirty;
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if(file)
    {
      this.convertToBase64(file);
    }
}

convertToBase64(file: File): void {
  const reader = new FileReader();
  reader.onload = (e:any) => {
    this.base64Image = e.target.result
  };
  reader.readAsDataURL(file);
}

  updateAssign(): void {
    this.setData();
    if (this.updateAssignForm.valid) {
      const updatedData = this.updateAssignForm.value;
      const ownerId = this.updateAssignForm.get('owner')?.value;
      const employeeId = this.updateAssignForm.get('employee')?.value;
      const memberId = this.updateAssignForm.get('member')?.value;
      updatedData.owner = this.owners.find((owner: any) => owner.id === ownerId);
      updatedData.employee = this.employees.find((employee: any) => employee.id === employeeId);
      updatedData.member = this.members.find( (member: any) => member.id === memberId);
      updatedData.id = this.data.id;
      updatedData.file = this.base64Image;
      const url = `${this.appService.getAssignList()}/${updatedData.id}`;
      this.http.put(url, updatedData).subscribe(
        (response) => {
          this.toast.success({detail:"SUCCESS",summary:'Đã cập nhật thành công',duration:5000});
          this.dialogRef.close();
        },
        (error) => {
          this.toast.error({detail:"ERROR",summary:'Vui lòng thử lại',sticky:true});
        }
      );
    }
  }

  initData() {
    const e_url = this.appService.getEmployees();
    this.http.get(e_url).subscribe((result: any) => {
      this.owners = result;
      this.employees = result;
    });
  }

  setData() {
    let startDate = this.updateAssignForm.get('startDate')?.value as Date;
    let createdDate = this.data.createdDate as unknown as Date;
    if (startDate <= createdDate) {
      this.updateAssignForm.get('status')?.setValue(this.status[2]);
    } else {
      this.updateAssignForm.get('status')?.setValue(this.status[1]);
    }
  }

}
