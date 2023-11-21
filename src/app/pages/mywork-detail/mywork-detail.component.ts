import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyworkComponent } from '../mywork/mywork.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyworkService } from 'src/app/services/mywork.service';
import { MatDialogModule } from '@angular/material/dialog';
import { STATES } from 'src/app/shared/assign-states';
import { EMPLOYEES_LIST } from 'src/app/shared/employees-value';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { StepProgressComponent } from '../../shared/step-progress/step-progress.component';
import { WORK_STATES } from 'src/app/shared/my-work-states';
@Component({
  selector: 'app-mywork-detail',
  standalone: true,
  imports: [CommonModule,
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
    MatDialogModule],
  providers: [MyworkComponent],
  templateUrl: './mywork-detail.component.html',
  styleUrls: ['./mywork-detail.component.scss']
})
export class MyworkDetailComponent implements OnInit, OnDestroy {
  work: any
  private subscription!: Subscription;
  state = WORK_STATES
  currentStep!: number
  employees = EMPLOYEES_LIST
  owners = EMPLOYEES_LIST
  updateAssignForm!: FormGroup;
  isFormDirty: boolean = false;
  isDisable: boolean = false;
  constructor(private myworkService: MyworkService, private mywork: MyworkComponent, private route: ActivatedRoute, private formBuilder: FormBuilder) {

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.myworkService.getMyWorkData().subscribe((data) => {
      if (data) {
        this.work = data;
      } else {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        if (id) {
          this.getMyWork(id);
        }
      }
    });

    this.currentStep = this.work.status.id
    if (this.work.status.id !== 1 && this.work.status.id !== 2) {
      this.isDisable = true;
    }

    this.updateAssignForm = this.formBuilder.group({
      branch: [{ value: this.work.branchname, disabled: this.isDisable }],
      member: [{ value: this.work.member, disabled: this.isDisable }],
      owner: [{ value: this.work.owner, disabled: this.isDisable }],
      startDate: [{ value: this.work.startDate, disabled: this.isDisable }],
      endDate: [{ value: this.work.endDate, disabled: this.isDisable }],
      employee: [{ value: this.work.employee, disabled: this.isDisable }],
      note: [{ value: this.work.note, disabled: this.isDisable }],
      approver: [{ value: this.work.approver, disabled: this.isDisable }],
      file: [''],
    });

    this.updateAssignForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.updateAssignForm.dirty;
    });

  }



  getMyWork(id: Number): void {
    this.work = this.mywork.dataSource.find(p => p.id === id)
  }




}
