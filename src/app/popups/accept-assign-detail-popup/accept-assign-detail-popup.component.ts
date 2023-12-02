import { Component, Inject, OnInit } from '@angular/core';
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
import { StepProgressComponent } from "../../shared/step-progress/step-progress.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ASSIGN_STATUS } from 'src/app/shared/assign-status';
import { ImagePopupComponent } from 'src/app/shared/image-popup/image-popup.component';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-accept-assign-detail-popup',
    standalone: true,
    templateUrl: './accept-assign-detail-popup.component.html',
    styleUrls: ['./accept-assign-detail-popup.component.scss'],
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
        StepProgressComponent,
        ReactiveFormsModule,
        NgToastModule,
    ]
})
export class AcceptAssignDetailPopupComponent implements OnInit {
  assignForm!: FormGroup;
  currentStep!: number;
  status = ASSIGN_STATUS;
  isDisable: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AssignModel,
    private dialogRef: MatDialogRef<AcceptAssignDetailPopupComponent>,
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
      this.assignForm.get('status')?.setValue(ASSIGN_STATUS[2])
      const url = `${this.appService.getAssignList()}/${this.data.id}`
      this.http.put(url, this.assignForm.value).subscribe
      ( (result) =>
        {
          this.toast.info({detail:"INFO",summary:`Bạn đã nhận bản ghi ID: ${this.data.id}`,sticky:true});
          this.dialogRef.close();
        }
      )
  }

  openImagePopup(): void {
    const imageURL = this.data.file
    this.dialog.open(ImagePopupComponent, {
      data: imageURL,
    });
  }
}
