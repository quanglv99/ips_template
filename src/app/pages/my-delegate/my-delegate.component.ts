import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { Observable } from 'rxjs';
import { TRAN_STATUS } from 'src/app/shared/const/tran-status';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MEMBER_LIST } from 'src/app/shared/const/member-value';
import { DelegateModel } from 'src/app/shared/models/delegate-models';
import { MyDelegatePopupComponent } from 'src/app/popups/my-delegate-popup/my-delegate-popup.component';

@Component({
  selector: 'app-my-delegate',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './my-delegate.component.html',
  styleUrls: ['./my-delegate.component.scss'],
})
export class MyDelegateComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[0];
  pageNumber = 1;
  totalItems = 0;
  reponseData: any;
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
  formSearch!: FormGroup;
  hide = false;
  isOpen =true
  memberFilter = MEMBER_LIST;
  statusFilter = TRAN_STATUS;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private appConfig: AppService,
    private formBuilder: FormBuilder
  ) {}

  onClick(element: any): void {
    const dialogRef = this.dialog.open(MyDelegatePopupComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refreshTableData();
    });
  }

  ngOnInit(): void {
    this.initSearch();
    this.initDataTable();
  }

  initDataTable() {
    if (!this.dataSource) {
      const url = this.appConfig.getDelegateUrl();
      this.http.get(url).subscribe((result: any) => {
        this.data = result.sort(
          (a: DelegateModel, b: DelegateModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        this.dataSource = new MatTableDataSource<DelegateModel>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  refreshSearch() {
    this.initSearch();
    this.onSearch();
  }

  initSearch() {
    this.formSearch = this.formBuilder.group({
      branchnameInput: [''],
      startDateInput: [''],
      endDateInput: [''],
      ownerInput: [''],
      employeeInput: [''],
      memberInput: [''],
      statusInput: [''],
    });
  }

  onSearch() {
    const url = this.appConfig.getDelegateUrl();
    const filterParams = this.formSearch.value;

    this.http.get(url).subscribe((result: any) => {
      this.data = result
        .filter((item: DelegateModel) => {
          return (
            (filterParams.branchnameInput === '' ||
              item.branchname
                .toLowerCase()
                .includes(filterParams.branchnameInput.toLowerCase())) &&
            (!filterParams.startDateInput ||
              new Date(item.createdDate) >= filterParams.startDateInput) &&
            (!filterParams.endDateInput ||
              new Date(item.createdDate) <= filterParams.endDateInput) &&
            (filterParams.ownerInput === '' ||
              item.owner.code
                .toLowerCase()
                .includes(filterParams.ownerInput.toLowerCase()) ||
              item.owner.fullname
                .toLowerCase()
                .includes(filterParams.ownerInput.toLowerCase())) &&
            (filterParams.employeeInput === '' ||
              item.employee.code
                .toLowerCase()
                .includes(filterParams.employeeInput.toLowerCase()) ||
              item.employee.fullname
                .toLowerCase()
                .includes(filterParams.employeeInput.toLowerCase())) &&
            (filterParams.memberInput === '' ||
              item.member.id === filterParams.memberInput) &&
            (filterParams.statusInput === '' ||
              item.status.id === filterParams.statusInput)
          );
        })
        .sort(
          (a: DelegateModel, b: DelegateModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
      this.dataSource.data = this.data;
    });
  }

  onChange($event: any) {
    if ($event.value != 0) {
      let filerData = this.data.filter(
        (item: any) => item.status.id == $event.value
      );
      this.dataSource = new MatTableDataSource<DelegateModel>(filerData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource<DelegateModel>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  deleteRow(element: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: 'Are you sure to detele this record?',
        showYesNo: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteRecord(element.id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (item: DelegateModel) => item.id !== element.id
          );
        });
      }
    });
  }

  deleteRecord(id: number): Observable<any> {
    const url = `${this.appConfig.getDelegateUrl()}/${id}`;
    return this.http.delete(url);
  }

  refreshTableData() {
    const url = this.appConfig.getDelegateUrl();
    this.http.get(url).subscribe((result: any) => {
      this.data = result.sort(
        (a: DelegateModel, b: DelegateModel) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
      this.dataSource.data = this.data;
    });
  }
}
