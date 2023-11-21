import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MyAssignDetailPopupComponent } from 'src/app/popups/my-assign-detail-popup/my-assign-detail-popup.component';
import { AssignModel } from 'src/app/shared/assign';
import { STATES } from 'src/app/shared/assign-states';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { EMPLOYEES_LIST } from 'src/app/shared/employees-value';



export const ELEMENT_DATA: AssignModel[] = [
  {
    id: 1,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    owner: EMPLOYEES_LIST[0],
    employee: EMPLOYEES_LIST[1],
    note: 'Giup anh nhé',
    approver: '',
    file: '',
    createdDate: '2023-08-17T18:17:39.691Z',
    createdUser: "Admin",
    updatedDate: "2023-08-17T18:17:39.691Z",
    updatedUser: "Admin",
    status: STATES[1],
  },
  {
    id: 2,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    owner: EMPLOYEES_LIST[0],
    employee: EMPLOYEES_LIST[1],
    note: 'Giup anh nhé',
    approver: '',
    file: '',
    createdDate: '2023-08-17T18:17:39.691Z',
    createdUser: "Admin",
    updatedDate: "2023-08-17T18:17:39.691Z",
    updatedUser: "Admin",
    status: STATES[1],
  },
  {
    id: 3,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    owner: EMPLOYEES_LIST[0],
    employee: EMPLOYEES_LIST[1],
    note: 'Giup anh nhé',
    approver: '',
    file: '',
    createdDate: '2023-08-17T18:17:39.691Z',
    createdUser: "Admin",
    updatedDate: "2023-08-17T18:17:39.691Z",
    updatedUser: "Admin",
    status: STATES[2],
  },
  {
    id: 4,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    owner: EMPLOYEES_LIST[0],
    employee: EMPLOYEES_LIST[1],
    note: 'Giup anh nhé',
    approver: '',
    file: '',
    createdDate: '2023-08-17T18:17:39.691Z',
    createdUser: "Admin",
    updatedDate: "2023-08-17T18:17:39.691Z",
    updatedUser: "Admin",
    status: STATES[3],
  },
  {
    id: 5,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    owner: EMPLOYEES_LIST[0],
    employee: EMPLOYEES_LIST[1],
    note: 'Giup anh nhé',
    approver: '',
    file: '',
    createdDate: '2023-08-17T18:17:39.691Z',
    createdUser: "Admin",
    updatedDate: "2023-08-17T18:17:39.691Z",
    updatedUser: "Admin",
    status: STATES[4],
  },
  {
    id: 6,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    owner: EMPLOYEES_LIST[0],
    employee: EMPLOYEES_LIST[1],
    note: 'Giup anh nhé',
    approver: '',
    file: '',
    createdDate: '2023-08-17T18:17:39.691Z',
    createdUser: "Admin",
    updatedDate: "2023-08-17T18:17:39.691Z",
    updatedUser: "Admin",
    status: STATES[5],
  },
  {
    id: 7,
    branchname: 'Tây Hồ',
    member: 'Thành phần 1',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    owner: EMPLOYEES_LIST[0],
    employee: EMPLOYEES_LIST[1],
    note: 'Giup anh nhé',
    approver: '',
    file: '',
    createdDate: '2023-08-17T18:17:39.691Z',
    createdUser: "Admin",
    updatedDate: "2023-08-17T18:17:39.691Z",
    updatedUser: "Admin",
    status: STATES[6],
  },
];

@Component({
  selector: 'app-myassign',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule],
  templateUrl: './myassign.component.html',
  styleUrls: ['./myassign.component.scss']
})
export class MyassignComponent implements OnInit {
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
  dataSource: any;


  constructor(private dialog: MatDialog) { }

  onClick(element: any): void {
    const dialogRef = this.dialog.open(MyAssignDetailPopupComponent, {
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
    const slicedData = ELEMENT_DATA.slice(startIndex, endIndex);
  
    this.dataSource = new MatTableDataSource(slicedData);

    this.totalItems = ELEMENT_DATA.length;

    if (this.paginator) {
      this.paginator.length = this.totalItems;
      this.paginator.pageIndex = 0;
    }

  }

  onPageChange(event: any): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadMyWorkPage();
  }

  deleteRow(element: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: 'Are you sure to detele this record?',
        showYesNo: true
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

      }
    })
  }
}
