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
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { TRAN_STATUS } from 'src/app/shared/const/tran-status';
import { MEMBER_LIST } from 'src/app/shared/const/member-value';
import { DelegateModel } from 'src/app/shared/models/delegate-models';
import { ReceivedDelegatePopupComponent } from 'src/app/popups/received-delegate-popup/received-delegate-popup.component';
@Component({
  selector: 'app-received-delegate',
  standalone: true,
  imports: [CommonModule,
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
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,],
  templateUrl: './received-delegate.component.html',
  styleUrls: ['./received-delegate.component.scss']
})
export class ReceivedDelegateComponent {
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
  isOpen =true
  data: any;
  hide= false;
  formSearch! : FormGroup
  statusFilter = TRAN_STATUS
  memberFilter = MEMBER_LIST
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private appConfig: AppService,
    private formBuilder: FormBuilder,
  ) {}

  onClick(element: any): void {
    const dialogRef = this.dialog.open(ReceivedDelegatePopupComponent, {
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
      this.http
        .get(url)
        .subscribe((filterResult: any) => {
          this.data = filterResult.sort(
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
      this.data = result.filter((item: DelegateModel) => {
        return (
          (filterParams.branchnameInput === '' || item.branchname.toLowerCase().includes(filterParams.branchnameInput.toLowerCase())) &&
          (!filterParams.startDateInput || new Date(item.createdDate) >= filterParams.startDateInput) &&
          (!filterParams.endDateInput || new Date(item.createdDate) <= filterParams.endDateInput) &&
          (filterParams.ownerInput === '' || item.owner.code.toLowerCase().includes(filterParams.ownerInput.toLowerCase()) || item.owner.fullname.toLowerCase().includes(filterParams.ownerInput.toLowerCase())) &&
          (filterParams.employeeInput === '' || item.employee.code.toLowerCase().includes(filterParams.employeeInput.toLowerCase()) || item.employee.fullname.toLowerCase().includes(filterParams.employeeInput.toLowerCase())) &&
          (filterParams.memberInput === '' || item.member.id === filterParams.memberInput) &&
          (filterParams.statusInput === '' || item.status.id === filterParams.statusInput)
        );
      }).sort(
        (a: DelegateModel, b: DelegateModel) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
      this.dataSource.data = this.data;
    });
  }

  refreshTableData() {
    const url = this.appConfig.getDelegateUrl();
    this.http
      .get(url)
      .subscribe((result: any) => {
        this.data = result.sort(
          (a: DelegateModel, b: DelegateModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        this.dataSource.data = this.data;
      });
  }
}
