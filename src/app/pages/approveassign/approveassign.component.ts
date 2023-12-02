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
import { AssignModel } from 'src/app/shared/assign';
import { ApproveAssignDetailPopupComponent } from 'src/app/popups/approve-assign-detail-popup/approve-assign-detail-popup.component';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-approveassign',
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
  templateUrl: './approveassign.component.html',
  styleUrls: ['./approveassign.component.scss'],
})
export class ApproveassignComponent implements OnInit {
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
    const dialogRef = this.dialog.open(ApproveAssignDetailPopupComponent, {
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
        .pipe(map((result: any) => result.filter((r: any) => r.status.id >= 3)))
        .subscribe((filterResult: any) => {
          this.data = filterResult.sort(
            (a: AssignModel, b: AssignModel) =>
              new Date(b.createdDate).getTime() -
              new Date(a.createdDate).getTime()
          );
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
      .pipe(map((result: any) => result.filter((r: any) => r.status.id >= 3)))
      .subscribe((filterResult: any) => {
        this.data = filterResult.sort(
          (a: AssignModel, b: AssignModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        this.dataSource.data = this.data;
      });
  }
}
