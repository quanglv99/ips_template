import { Component } from '@angular/core';
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


@Component({
  selector: 'app-add-work',
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
    MatNativeDateModule
  ],
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.scss']
})
export class AddWorkComponent {
  states: string[] = [
    'Tây Hồ',
    'Hoàn Kiếm',
    'Hai Bà Trưng',
    'Hoàng Mai',
    'Cầy Giấy',
  ]

  memebers: string[] = [
    'Thành phần 1',
    'Thành phần 2',
    'Thành phần 3'
  ]

  employees : Employee[] = [
    {id:1,code:"VIB0001",fullname:"Lo Van Quang",jobcode:"4.1729",position:"GD Chi nhánh",status:"Bình thường"},
    {id:2,code:"VIB0002",fullname:"Hoang Anh",jobcode:"5.0112",position:"TP Tài vụ",status:"Bình thường"},
    {id:3,code:"VIB0003",fullname:"Pham Cuong",jobcode:"5.1221",position:"Phó GD Chi nhánh",status:"Bình thường"},
    {id:4,code:"VIB0004",fullname:"Nguyen Anh",jobcode:"4.0297",position:"Trưởng BQL",status:"Bình thường"},
  ]
}
