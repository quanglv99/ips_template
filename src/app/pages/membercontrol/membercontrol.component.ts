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
import { ConfigService } from 'src/app/services/config.service';
import { MemberModel } from 'src/app/shared/members';

const ELEMENT_DATA: MemberModel[] = [
  {
    id: 1,
    name: 'Thành phần  1',
    jobcodes:  [
      { id: 1, nameJobcode: 'Jobcode1', descriptionJobcode: 'Description1', action: 'Action1' },
      { id: 2, nameJobcode: 'Jobcode2', descriptionJobcode: 'Description2', action: 'Action2' }
    ],
    status: 'Active',
  },
  {
    id: 2,
    name: 'Thành phần 2',
    jobcodes:  [
      { id: 1, nameJobcode: 'Jobcode1', descriptionJobcode: 'Description1', action: 'Action1' },
      { id: 2, nameJobcode: 'Jobcode2', descriptionJobcode: 'Description2', action: 'Action2' }
    ],
    status: 'Active',
  },
  {
    id: 3,
    name: 'Thành phần 3',
    jobcodes:  [
      { id: 1, nameJobcode: 'Jobcode1', descriptionJobcode: 'Description1', action: 'Action1' },
      { id: 2, nameJobcode: 'Jobcode2', descriptionJobcode: 'Description2', action: 'Action2' }
    ],
    status: 'Active',
  },
];
@Component({
  selector: 'app-membercontrol',
  standalone: true,
  imports: [
    CommonModule,
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
  templateUrl: './membercontrol.component.html',
  styleUrls: ['./membercontrol.component.scss']
})
export class MembercontrolComponent {
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
    'nameMember',
    'status',
    'action',
  ];
  dataSource = ELEMENT_DATA;


  constructor(private configService: ConfigService) {}

  onRowClick(element: any): void {
    this.configService.setConfigData(element);
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
