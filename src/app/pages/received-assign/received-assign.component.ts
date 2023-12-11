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
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MEMBER_LIST } from 'src/app/shared/const/member-value';
import { TRAN_STATUS } from 'src/app/shared/const/tran-status';
import { ReceivedAssignPopupComponent } from 'src/app/popups/received-assign-popup/received-assign-popup.component';
import { AssignModel } from 'src/app/shared/models/assign-models';
@Component({
  selector: 'app-received-assign',
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
  templateUrl: './received-assign.component.html',
  styleUrls: ['./received-assign.component.scss']
})
export class ReceivedAssignComponent implements OnInit {
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
  isOpen =true
  data: any;
hide =false
formSearch!: FormGroup
memberFilter = MEMBER_LIST
statusFilter = TRAN_STATUS
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private appConfig: AppService,
    private formBuilder: FormBuilder
  ) {}

  onClick(element: any): void {
    const dialogRef = this.dialog.open(ReceivedAssignPopupComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngOnInit(): void {
    this.initSearch();
    this.initDataTable();
  }

  initDataTable() {
    if (!this.dataSource) {
      const url = this.appConfig.getAssignUrl();
      this.http.get(url).subscribe((result: any) => {
        this.data =result.sort(
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
  refreshSearch()
  {
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

  onSearch()
  {
  const url = this.appConfig.getAssignUrl();
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
  
}
