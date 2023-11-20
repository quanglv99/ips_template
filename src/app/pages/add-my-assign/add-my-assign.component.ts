import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { Employee } from 'src/app/shared/employees';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMPLOYEES_LIST } from 'src/app/shared/employees-value';


@Component({
  selector: 'app-add-my-assign',
  standalone: true,
  imports: [CommonModule,
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
    ReactiveFormsModule
  ],
  templateUrl: './add-my-assign.component.html',
  styleUrls: ['./add-my-assign.component.scss']
})

export class AddMyAssignComponent implements OnInit {
  registerWorkForm! : FormGroup
constructor(private formBuilder: FormBuilder,){

}

  ngOnInit(): void {

    this.registerWorkForm = this.formBuilder.group({
      branch: ['', Validators.required], 
      member: ['', Validators.required],
      owner: { value: this.owners[0], disabled: true },
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      employee: ['', Validators.required],
      note: [''],
      aprrover: [''],
      file: ['']
      
    });
  }
  branch: string[] = [
    'Tây Hồ',
    'Hoàn Kiếm',
    'Hai Bà Trưng',
    'Hoàng Mai',
    'Cầy Giấy',
  ]

  members: string[] = [
    'Thành phần 1',
    'Thành phần 2',
    'Thành phần 3'
  ]

  employees = EMPLOYEES_LIST

  owners = EMPLOYEES_LIST
}
