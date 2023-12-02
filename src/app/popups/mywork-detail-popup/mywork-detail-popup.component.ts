import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
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
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { StepProgressComponent } from '../../shared/step-progress/step-progress.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WORK_STATES } from 'src/app/shared/my-work-states';
import { MyWorkModel } from 'src/app/shared/my-work';
import { MY_DATE_FORMATS } from 'src/app/shared/custom-date';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { MEMBER_LIST } from 'src/app/shared/member-value';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
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
    NgToastModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class MyworkDetailPopupComponent implements OnInit {
  currentStep!: number;

  updateWorkForm!: FormGroup;
  isFormDirty: boolean = false;
  isDisable: boolean = false;
  owners: any;
  employees: any;
  branch: string[] = [
    'Tây Hồ',
    'Hoàn Kiếm',
    'Hai Bà Trưng',
    'Hoàng Mai',
    'Cầy Giấy',
  ];
  status = WORK_STATES;
  members = MEMBER_LIST;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MyWorkModel,
    private dialogRef: MatDialogRef<MyworkDetailPopupComponent>,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
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

  initData() {
    const e_url = this.appService.getEmployees();
    this.http.get(e_url).subscribe((result: any) => {
      this.owners = result;
      this.employees = result;
    });
  }

  setData() {
    let startDate = this.updateWorkForm.get('startDate')?.value as Date;
    let createdDate = this.data.createdDate as unknown as Date;
    if (startDate <= createdDate) {
      this.updateWorkForm.get('status')?.setValue(this.status[2]);
    } else {
      this.updateWorkForm.get('status')?.setValue(this.status[1]);
    }
  }

  initializeForm() {
    this.updateWorkForm = this.formBuilder.group({
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
      status: [''],
    });
    if (this.data.status.id !== 1 && this.data.status.id !== 2) {
      this.updateWorkForm.get('owner')?.disable();
      this.updateWorkForm.get('employee')?.disable();
      this.updateWorkForm.get('member')?.disable();
    }
    this.updateWorkForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.updateWorkForm.dirty;
    });
  }

  onClose() {
    this.dialogRef.close();
  }
  updateWork(): void {
    this.setData();
    if (this.updateWorkForm.valid) {
      const updatedData = this.updateWorkForm.value;
      const ownerId = this.updateWorkForm.get('owner')?.value;
      const employeeId = this.updateWorkForm.get('employee')?.value;
      const memberId = this.updateWorkForm.get('member')?.value;
      updatedData.owner = this.owners.find((owner: any) => owner.id === ownerId);
      updatedData.employee = this.employees.find((employee: any) => employee.id === employeeId);
      updatedData.member = this.members.find( (member: any) => member.id === memberId);
      updatedData.id = this.data.id;
      const url = `${this.appService.getWorkList()}/${updatedData.id}`;
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
}
