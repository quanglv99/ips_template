import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MyworkService } from 'src/app/services/mywork.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MyworkDetailPopupComponent } from 'src/app/popups/mywork-detail-popup/mywork-detail-popup.component';

export interface MyWorkModel {
  id: number;
  branchname: string;
  member: string;
  startDate: string;
  endDate: string;
  employee: string;
  note:string;
  createdDate: string;
  updatedDate: string;
  status: string;
}

const ELEMENT_DATA: MyWorkModel[] = [
  {
    id: 1,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    employee: 'Hoang Ngoc Anh',
    note:'Giup anh nhé',
    createdDate: '2023-08-17T18:17:39.691Z',
    updatedDate: '2023-08-17T08:03:19.128Z',
    status: 'Active',
  },
  {
    id: 2,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    employee: 'Hoang Ngoc Anh',
    note:'Giup anh nhé',
    createdDate: '2023-08-17T18:17:39.691Z',
    updatedDate: '2023-08-17T08:03:19.128Z',
    status: 'Expired',
  },
  {
    id: 3,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    employee: 'Hoang Ngoc Anh',
    note:'Giup anh nhé',
    createdDate: '2023-08-17T18:17:39.691Z',
    updatedDate: '2023-08-17T08:03:19.128Z',
    status: 'Active',
  },
  {
    id: 4,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    employee: 'Hoang Ngoc Anh',
    note:'Giup anh nhé',
    createdDate: '2023-08-17T18:17:39.691Z',
    updatedDate: '2023-08-17T08:03:19.128Z',
    status: 'Inactive',
  },
  {
    id: 5,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    employee: 'Hoang Ngoc Anh',
    note:'Giup anh nhé',
    createdDate: '2023-08-17T18:17:39.691Z',
    updatedDate: '2023-08-17T08:03:19.128Z',
    status: 'Active',
  },
  {
    id: 6,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    employee: 'Hoang Ngoc Anh',
    note:'Giup anh nhé',
    createdDate: '2023-08-17T18:17:39.691Z',
    updatedDate: '2023-08-17T08:03:19.128Z',
    status: 'Active', 
  },
  {
    id: 7,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    employee: 'Hoang Ngoc Anh',
    note:'Giup anh nhé',
    createdDate: '2023-08-17T18:17:39.691Z',
    updatedDate: '2023-08-17T08:03:19.128Z',
    status: 'Active',
  },
];

@Component({
  selector: 'app-mywork',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './mywork.component.html',
  styleUrls: ['./mywork.component.scss'],
})
export class MyworkComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | undefined;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;

  Filterchange($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = [
    'id',
    'branchname',
    'createdDate',
    'employee',
    'status',
    'action',
  ];
  dataSource = ELEMENT_DATA;

  
  constructor(private myworkService: MyworkService, private dialog:MatDialog) {}

  onRowClick(element: any): void {
    this.myworkService.setMyWorkData(element);
  }
  onClick(element: any): void{
    const dialogRef = this.dialog.open(MyworkDetailPopupComponent, {
      data: element 
    });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }


  ngOnInit(): void {
    this.loadMyWorkPage();
  }

  loadMyWorkPage(): void {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource = ELEMENT_DATA.slice(startIndex, endIndex);
    
    this.totalItems = ELEMENT_DATA.length;

    if(this.paginator)
    {
      this.paginator.length = this.totalItems;
      this.paginator.pageIndex = 0;
    }
    
  }

  onPageChange(event: any): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadMyWorkPage();
  }
}
