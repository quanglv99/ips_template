import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { MEMBER_LIST } from 'src/app/shared/const/member-value';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { TRAN_STATUS } from 'src/app/shared/const/tran-status';

@Component({
  selector: 'app-register-assign',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgToastModule,
  ],
  templateUrl: './register-assign.component.html',
  styleUrls: ['./register-assign.component.scss'],
})
export class RegisterAssignComponent implements OnInit {
  registerWorkForm!: FormGroup;
  employees: any;
  owners: any;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.initData();
    this.initializeForm();
  }
  initializeForm() {
    this.registerWorkForm = this.formBuilder.group({
      branchname: ['', Validators.required],
      owner: [{ value: this.owners }, Validators.required],
      member: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      employee: [{ value: this.employees }, Validators.required],
      status: [''],
      createdDate: [new Date()],
      createdUser: ['QuangLV'],
      note: [''],
    });
  }
  initData() {
    const e_url = this.appService.getEmployees();
    this.http.get(e_url).subscribe((result: any) => {
      this.owners = result;
      this.employees = result;
    });
  }
  setStatus() {
    let startDate = this.registerWorkForm.get('startDate')?.value as Date;
    let createdDate = new Date();
    if (startDate <= createdDate) {
      this.registerWorkForm.get('status')?.setValue(this.status[2]);
    } else {
      this.registerWorkForm.get('status')?.setValue(this.status[1]);
    }
  }

  onSummit() {
    this.setStatus();
    if (this.registerWorkForm.valid) {
      const formData = this.registerWorkForm.value;
      const apiUrl = this.appService.getAssignUrl();

      this.http.post(apiUrl, formData).subscribe(
        (response) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Thêm mới thành công',
            duration: 5000,
          });
          this.router.navigate(['/default/my-assign']);
        },
        (error) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Vui lòng thử lại',
            sticky: true,
          });
        }
      );
    }
  }

  status = TRAN_STATUS;

  states: string[] = [
    'Tây Hồ',
    'Hoàn Kiếm',
    'Hai Bà Trưng',
    'Hoàng Mai',
    'Cầy Giấy',
  ];

  members = MEMBER_LIST;
}
