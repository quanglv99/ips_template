import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MyWorkModel } from 'src/app/pages/mywork/mywork.component';
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
@Component({
  selector: 'app-mywork-detail-popup',
  standalone: true,
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
  ],
  templateUrl: './mywork-detail-popup.component.html',
  styleUrls: ['./mywork-detail-popup.component.scss'],
})
export class MyworkDetailPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: MyWorkModel, private dialogRef: MatDialogRef<MyworkDetailPopupComponent>) {}

  onClose()
  {
    this.dialogRef.close();
  }
  
}
