import {  Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
} from '@angular/material/core';
import { StepProgressComponent } from '../../shared/step-progress/step-progress.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { ConfigMember } from 'src/app/shared/models/config-member';
import { MemberModel } from 'src/app/shared/models/member.models';

@Component({
  selector: 'app-edit-config-detail-popup',
  standalone: true,
  imports: [CommonModule,
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
  ],
  templateUrl: './edit-config-detail-popup.component.html',
  styleUrls: ['./edit-config-detail-popup.component.scss']
})
export class EditConfigDetailPopupComponent implements OnInit {
  members!: MemberModel[];
  editConfigPopup!: FormGroup;
  isFormDirty: boolean = false;
  isDisable: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfigMember,
    private dialogRef: MatDialogRef<EditConfigDetailPopupComponent>,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initData()
    this.initializeForm();

  }

  initData() {
    const e_url = this.appService.getMemberList();
    this.http.get(e_url).subscribe((result: any) => {
      this.members = result;
    });
  }
  initializeForm() {
    this.editConfigPopup = this.formBuilder.group({
      name: [this.data.nameConfig],
      members: [
        this.data.members.map((member: { id: number }) => member.id),
        { value: this.data.members},
      ],
      note: [this.data.noteConfig],
    });

    this.editConfigPopup.valueChanges.subscribe(() => {
      this.isFormDirty = this.editConfigPopup.dirty;
    });
  }

  updateConfigMembers(): void {
    if (this.editConfigPopup.valid) {
      const updateConfigMembers = this.editConfigPopup.value;
      const jobcodeIds = updateConfigMembers.members;
      updateConfigMembers.status='active'

      // Map lại thành mảng các jobcodes dựa trên id
      updateConfigMembers.jobcodes = jobcodeIds.map((id: number) =>
        this.members.find((member: any) => member.id === id)
      );

      // Thực hiện cập nhật thông tin thành viên
      const url = `${this.appService.getConfigMemberList()}/${this.data.id}`;
      this.http.put(url, updateConfigMembers).subscribe(
        (response) => {
          console.log('Update successful', response);
          this.dialogRef.close(); // Đóng dialog sau khi cập nhật thành công
        },
        (error) => {
          console.error('Update failed', error);
        }
      );
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
