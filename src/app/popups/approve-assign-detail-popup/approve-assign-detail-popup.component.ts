import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignModel } from 'src/app/shared/assign';
import { ASSIGN_STATUS } from 'src/app/shared/assign-status';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { ImagePopupComponent } from 'src/app/shared/image-popup/image-popup.component';
import { StepProgressComponent } from "../../shared/step-progress/step-progress.component";
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-approve-assign-detail-popup',
    standalone: true,
    templateUrl: './approve-assign-detail-popup.component.html',
    styleUrls: ['./approve-assign-detail-popup.component.scss'],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        RouterModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        StepProgressComponent,
        NgToastModule,
    ]
})
export class ApproveAssignDetailPopupComponent {
  assignForm!: FormGroup;
  currentStep!: number;
  status = ASSIGN_STATUS;
  isDisable: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AssignModel,
    private dialogRef: MatDialogRef<ApproveAssignDetailPopupComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private http: HttpClient,
    private appService: AppService,
    private toast: NgToastService,
  ) {}
  ngOnInit(): void {
    this.currentStep = this.data.status.id;
    this.initializeForm();
  }

  initializeForm() {
    this.assignForm = this.formBuilder.group({
      branchname: [this.data.branchname],
      member: [this.data.member],
      owner: [this.data.owner],
      startDate: [this.data.startDate],
      endDate: [this.data.endDate],
      employee: [this.data.employee],
      note: [this.data.note],
      approver: [this.data.approver],
      createdDate: [this.data.createdDate],
      createdUser: [this.data.createdUser],
      updatedDate: [new Date()],
      updatedUser: ['QuangLV'],
      file: [this.data.file],
      status: [''],
    });
  }
  onClose() {
    this.dialogRef.close();
  }

  onAccept():void
  { 
      this.assignForm.get('status')?.setValue(ASSIGN_STATUS[3])
      const url = `${this.appService.getAssignList()}/${this.data.id}`
      this.http.put(url, this.assignForm.value).subscribe
      ( (result) =>
        {
          this.toast.info({detail:"INFO",summary:`Bạn đã phê duyệt bản ghi ID: ${this.data.id}`,sticky:true});
          this.dialogRef.close();
        }
      )
  }

}
