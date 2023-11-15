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

export interface MyWorkModel {
  id: number;
  branchname: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  targetOwner: string;
  status: string;
}

const ELEMENT_DATA: MyWorkModel[] = [
  {
    id: 1,
    branchname: 'Tây Hồ',
    createdAt: '2023-08-17T08:03:19.128Z',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    targetOwner: 'Hoang Ngoc Anh',
    status: 'Active',
  },
  {
    id: 2,
    branchname: 'Hoàng Mai',
    createdAt: '2023-08-17T08:03:19.128Z',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    targetOwner: 'Hoang Ngoc Anh',
    status: 'Inactive',
  },
  {
    id: 3,
    branchname: 'Hai Bà Trưng',
    createdAt: '2023-08-17T08:03:19.128Z',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    targetOwner: 'Hoang Ngoc Anh',
    status: 'Valid',
  },
  {
    id: 4,
    branchname: 'Hoàn Kiếm',
    createdAt: '2023-08-17T08:03:19.128Z',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    targetOwner: 'Hoang Ngoc Anh',
    status: 'Expired',
  },
  {
    id: 5,
    branchname: 'Hoàn Kiếm',
    createdAt: '2023-08-17T08:03:19.128Z',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    targetOwner: 'Hoang Ngoc Anh',
    status: 'Expired',
  },
  {
    id: 6,
    branchname: 'Hoàn Kiếm',
    createdAt: '2023-08-17T08:03:19.128Z',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    targetOwner: 'Hoang Ngoc Anh',
    status: 'Expired',
  },
  {
    id: 7,
    branchname: 'Hoàn Kiếm',
    createdAt: '2023-08-17T08:03:19.128Z',
    startDate: '2023-08-17T18:17:39.691Z',
    endDate: '2023-08-17T18:17:39.691Z',
    targetOwner: 'Hoang Ngoc Anh',
    status: 'Expired',
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
    MatInputModule
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
    'createdAt',
    'targetOwner',
    'status',
    'action',
  ];
  dataSource = ELEMENT_DATA;

  
  constructor(private myworkService: MyworkService) {}

  onRowClick(element: any): void {
    this.myworkService.setMyWorkData(element);
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
