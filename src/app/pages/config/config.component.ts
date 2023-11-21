
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
import { ParameterconfigurationService } from 'src/app/services/parameterconfiguration.service';
import { MemberConfigModel } from 'src/app/shared/memberConfig';


const ELEMENT_DATA: MemberConfigModel[] = [
  {
    id: 1,
    nameConfig: 'Cấu hình 1',
    ingredientConfig: 'Thành phần 1, thành phần 2',
    noteConfig: 'Active',
  },
  {
    id: 2,
    nameConfig: 'Cấu hình 2',
    ingredientConfig: 'Thành phần 2',
    noteConfig: 'Inactive',
  },
  {
    id: 3,
    nameConfig: 'Cấu hình 3',
    ingredientConfig: 'Thành phần 3',
    noteConfig: 'Valid',
  },
  {
    id: 4,
    nameConfig: 'Cấu hình 4',
    ingredientConfig: 'Thành phần 1,Thành phần 2,Thành phần 3',
    noteConfig: 'Expired',
  },

];

@Component({
  selector: 'app-config',
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
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent  implements OnInit {
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
    'nameConfig',
    'ingredientConfig',
    'action',
  ];
  dataSource = ELEMENT_DATA;


  constructor(private parameterconfigurationService: ParameterconfigurationService) {}

  onRowClick(element: any): void {
    this.parameterconfigurationService.setParameterConfigurationData(element);
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
