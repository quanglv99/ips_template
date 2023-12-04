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
import { MyAssignDetailPopupComponent } from 'src/app/popups/my-assign-detail-popup/my-assign-detail-popup.component';
import { AssignModel } from 'src/app/shared/assign';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { Observable } from 'rxjs';
import { ASSIGN_STATUS } from 'src/app/shared/assign-status';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MEMBER_LIST } from 'src/app/shared/member-value';


@Component({
  selector: 'app-myassign',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,
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
  templateUrl: './myassign.component.html',
  styleUrls: ['./myassign.component.scss']
})
export class MyassignComponent implements OnInit {
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
  hide = false
  memberFilter = MEMBER_LIST
  statusFilter = ASSIGN_STATUS;
  constructor(private dialog: MatDialog, private http: HttpClient,
    private appConfig: AppService,
    private formBuilder: FormBuilder
  ) { }

  onClick(element: any): void {
    const dialogRef = this.dialog.open(MyAssignDetailPopupComponent, {
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshTableData();
    });
  }


  ngOnInit(): void {
    this.initSearch();
    this.initDataTable()
  }

  initDataTable() {
    if (!this.dataSource) {
      const url = this.appConfig.getAssignList();
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
    const url = this.appConfig.getAssignList();
    const filterParams = this.formSearch.value;

    this.http.get(url).subscribe((result: any) => {
      this.data = result.filter((item: AssignModel) => {
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
        (a: AssignModel, b: AssignModel) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
      this.dataSource.data = this.data;
    });
  }


  onChange($event: any) {
    if ($event.value != 0) {
      let filerData = this.data.filter(
        (item: any) => item.status.id == $event.value
      );
      this.dataSource = new MatTableDataSource<AssignModel>(filerData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource<AssignModel>(this.data);
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
            (item: AssignModel) => item.id !== element.id
          );
        });
      }
    });
  }

  deleteRecord(id: number): Observable<any> {
    const url = `${this.appConfig.getAssignList()}/${id}`;
    return this.http.delete(url);
  }

  refreshTableData() {
    const url = this.appConfig.getAssignList();
    this.http.get(url).subscribe((result: any) => {
      this.data = result.sort(
        (a: AssignModel, b: AssignModel) =>
          new Date(b.createdDate).getTime() -
          new Date(a.createdDate).getTime()
      );
      this.dataSource.data = this.data;
    });
  }
}
