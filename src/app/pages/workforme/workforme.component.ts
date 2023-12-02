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
import { WorkForMeDetailPopupComponent } from 'src/app/popups/work-for-me-detail-popup/work-for-me-detail-popup.component';
import { MyWorkModel } from 'src/app/shared/my-work';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-workforme',
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
  templateUrl: './workforme.component.html',
  styleUrls: ['./workforme.component.scss'],
})
export class WorkformeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator
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
    const dialogRef = this.dialog.open(WorkForMeDetailPopupComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  initDataTable() {
    if (!this.dataSource) {
      const url = this.appConfig.getWorkList();
      this.http.get(url).subscribe((result: any) => {
        this.data =result.sort(
          (a: MyWorkModel, b: MyWorkModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        this.dataSource = new MatTableDataSource<MyWorkModel>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
}
