
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
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MyworkService } from 'src/app/services/mywork.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AssignModel } from 'src/app/shared/assign';
import { ApproveAssignDetailPopupComponent } from 'src/app/popups/approve-assign-detail-popup/approve-assign-detail-popup.component';
import { ELEMENT_DATA } from '../myassign/myassign.component';



@Component({
  selector: 'app-approveassign',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,
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
    templateUrl: './approveassign.component.html',
  styleUrls: ['./approveassign.component.scss']
})
export class ApproveassignComponent implements OnInit {
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
    'owner',
    'employee',
    'status',
    'action',
  ];
  dataSource:any;

  
  constructor(private myworkService: MyworkService, private dialog:MatDialog) {}

  onRowClick(element: any): void {
    this.myworkService.setMyWorkData(element);
  }
  onClick(element: any): void{
    const dialogRef = this.dialog.open(ApproveAssignDetailPopupComponent, {
      data: element 
    });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }


  ngOnInit(): void {
    this.dataSource = ELEMENT_DATA.filter( r => r.status.id === 3)
    this.loadMyWorkPage();
  }

  loadMyWorkPage(): void {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    // Ensure endIndex does not exceed the length of the array
    const slicedData = ELEMENT_DATA.filter( r => r.status.id >= 3).slice(startIndex, endIndex);
  
    this.dataSource = new MatTableDataSource(slicedData);
    
    this.totalItems = ELEMENT_DATA.filter( r => r.status.id >= 3).length;
  
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
}
