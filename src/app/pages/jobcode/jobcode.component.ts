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
import { MemberConfigModel } from 'src/app/shared/memberConfig';
import { JobcodeModel } from 'src/app/shared/jobcode';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JobcodeService } from 'src/app/services/jobcode.service';
import { HttpClientModule } from '@angular/common/http';

const ELEMENT_DATA: JobcodeModel[] = [
  {
    id: 1,
    nameJobcode: 'Jobcode 1',
    descriptionJobcode: 'Giám đốc phòng kinh doanh',
    action: 'Active',
  },
  {
    id: 2,
    nameJobcode: 'Jobcode 2',
    descriptionJobcode: 'Trưởng phòng kinh doanh',
    action: 'Inactive',
  },
  {
    id: 3,
    nameJobcode: 'Jobcode 3',
    descriptionJobcode: 'Giám đốc chi nhánh',
    action: 'Valid',
  },
  {
    id: 4,
    nameJobcode: 'Jobcode 4',
    descriptionJobcode: 'Phó giám đốc kinh doanh',
    action: 'Expired',
  },

];

@Component({
  selector: 'app-jobcode',
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
    HttpClientModule
  ],
  templateUrl: './jobcode.component.html',
  styleUrls: ['./jobcode.component.scss']
})
export class JobcodeComponent implements OnInit{
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
    'nameJobcode',
    'descriptionJobcode',
    'action',
  ];
  dataSource = ELEMENT_DATA;


  constructor(private configService: ConfigService, private http: HttpClient, private jobcodeService: JobcodeService) {}

  onRowClick(element: any): void {
    this.configService.setConfigData(element);
  }


  ngOnInit(): void {
    this.loadMyWorkPage();
    this.getJobcodeList();
  }

  getJobcodeList(){
    this.jobcodeService.getJobcodeList().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: console.log,
    });
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
