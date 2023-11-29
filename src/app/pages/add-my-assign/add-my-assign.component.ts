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
import { ASSIGN_STATUS } from 'src/app/shared/assign-status';
import { MEMBER_LIST } from 'src/app/shared/member-value';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-my-assign',
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
  ],
  templateUrl: './add-my-assign.component.html',
  styleUrls: ['./add-my-assign.component.scss'],
})
export class AddMyAssignComponent implements OnInit {
  registerAssignForm!: FormGroup;
  employees: any;
  owners: any;

  status = ASSIGN_STATUS;
  base64Image!: string;
  branches: string[] = [
    'Tây Hồ',
    'Hoàn Kiếm',
    'Hai Bà Trưng',
    'Hoàng Mai',
    'Cầy Giấy',
  ];

  members = MEMBER_LIST;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initData();
    this.initializeForm();
  }
  initializeForm() {
    this.registerAssignForm = this.formBuilder.group({
      branchname: ['', Validators.required],
      owner: [{ value: this.owners }, Validators.required],
      member: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      employee: [{ value: this.employees }, Validators.required],
      status: [''],
      createdDate: [new Date()],
      createdUser: ['QuangLV'],
      updatedDate: [''],
      updatedUser: [''],
      approver:[''],
      note: [''],
      file: [''],
    });
  }
  initData() {
    const e_url = this.appService.getEmployees();
    this.http.get(e_url).subscribe((result: any) => {
      this.owners = result;
      this.employees = result;
    });
  }
  setData() {
    let startDate = this.registerAssignForm.get('startDate')?.value as Date;
    let createdDate = new Date();
    if (startDate <= createdDate) {
      this.registerAssignForm.get('status')?.setValue(this.status[2]);
    } else {
      this.registerAssignForm.get('status')?.setValue(this.status[1]);
    }
    console.log("Base64 Image: ", this.base64Image);
    this.registerAssignForm.get('file')?.setValue(this.base64Image);
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

  onSummit() {
    this.setData();
    if (this.registerAssignForm.valid) {
      
      const formValues = this.registerAssignForm.value;
      const apiUrl = this.appService.getAssignList();
      this.http.post(apiUrl, formValues).subscribe(
        (response) => {
          console.log("hihihi: ", response)
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
              message: 'Đăng ký ủy quyền thành công, trở về trang chính?',
              showYesNo: true,
            },
          });

          dialogRef.afterClosed().subscribe((response) => {
            if (response) this.router.navigate(['/default/my-assign']);
          });
        },
        (error) => {
          console.error('Error adding data:', error);
        }
      );
    }
  }
}
