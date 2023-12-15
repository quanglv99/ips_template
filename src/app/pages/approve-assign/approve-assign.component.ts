import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { MEMBER_LIST } from 'src/app/shared/const/member-value';
import { TRAN_STATUS } from 'src/app/shared/const/tran-status';
import { AssignModel } from 'src/app/shared/models/assign-models';
import { ApproveAssignPopupComponent } from 'src/app/popups/approve-assign-popup/approve-assign-popup.component';

@Component({
  selector: 'app-approve-assign',
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
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './approve-assign.component.html',
  styleUrls: ['./approve-assign.component.scss'],
})
export class ApproveAssignComponent implements OnInit {
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
  isOpen = true;
  data: any;
  hide = false;
  formSearch!: FormGroup;
  memberFilter = MEMBER_LIST;
  statusFilter = TRAN_STATUS;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private appConfig: AppService,
    private formBuilder: FormBuilder
  ) {}

  onClick(element: any): void {
    const dialogRef = this.dialog.open(ApproveAssignPopupComponent, {
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
      const url = this.appConfig.getAssignUrl();
      this.http.get(url).subscribe((result: any) => {
        this.data = result.sort(
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
    const url = this.appConfig.getAssignUrl();
    const filterParams = this.formSearch.value;

    this.http.get(url).subscribe((result: any) => {
      this.data = result
        .filter((item: AssignModel) => {
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
          (a: AssignModel, b: AssignModel) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
      this.dataSource.data = this.data;
    });
  }

  refreshTableData() {
    const url = this.appConfig.getAssignUrl();
    this.http.get(url).subscribe((filterResult: any) => {
      this.data = filterResult.sort(
        (a: AssignModel, b: AssignModel) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
      this.dataSource.data = this.data;
    });
  }
}
