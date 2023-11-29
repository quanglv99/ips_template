import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AcceptAssignDetailPopupComponent } from 'src/app/popups/accept-assign-detail-popup/accept-assign-detail-popup.component';
import { ELEMENT_DATA } from '../myassign/myassign.component';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { AssignModel } from 'src/app/shared/assign';
import { map } from 'rxjs';

@Component({
  selector: 'app-acceptassign',
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
    MatDialogModule,
  ],
  templateUrl: './acceptassign.component.html',
  styleUrls: ['./acceptassign.component.scss'],
})
export class AcceptassignComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  displayedColumns: string[] = [
    'id',
    'branchname',
    'createdDate',
    'owner',
    'employee',
    'member',
    'status',
    'action',
  ];
  dataSource: any;

  data: any;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private appConfig: AppService
  ) {}

  onClick(element: any): void {
    const dialogRef = this.dialog.open(AcceptAssignDetailPopupComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refreshTableData();
    });
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  initDataTable() {
    if (!this.dataSource) {
      const url = this.appConfig.getAssignList();
      this.http
        .get(url)
        .pipe(map((result: any) => result.filter((r: any) => r.status.id >= 2)))
        .subscribe((filterResult: any) => {
          this.data = filterResult;
          this.dataSource = new MatTableDataSource<AssignModel>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    }
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  refreshTableData() {
    const url = this.appConfig.getAssignList();
    this.http
      .get(url)
      .pipe(map((result: any) => result.filter((r: any) => r.status.id >= 2)))
      .subscribe((result: any) => {
        this.data = result;
        this.dataSource.data = this.data;
      });
  }
}
