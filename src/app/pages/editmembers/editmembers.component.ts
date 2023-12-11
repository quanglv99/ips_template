import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { JOBCODE_LIST } from 'src/app/shared/const/jobcode-value';
import { MembercontrolComponent } from '../membercontrol/membercontrol.component';

@Component({
  selector: 'app-editmembers',
  standalone: true,
  imports: [CommonModule,
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [MembercontrolComponent],
  templateUrl: './editmembers.component.html',
  styleUrls: ['./editmembers.component.scss']
})
export class EditmembersComponent implements OnInit, OnDestroy {
  data: any;
  subscription!: Subscription;
  members = new FormControl('');
  jobcodeList = JOBCODE_LIST;
  editMemberForm!: FormGroup;
  isDisable: boolean = false;
  isFormDirty: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private member: MembercontrolComponent,
    private dataService: MemberService,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.dataService.getMemberData().subscribe((data) => {
      if (data) {
        this.data = data;
      } else {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
          this.getMemberById(id);
        }
      }
      this.createForm();
    });

    this.editMemberForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.editMemberForm.dirty;
    });
    this.editMemberForm = this.formBuilder.group({
      inputMember: [{ value: this.data?.nameMember, disabled: this.isDisable }],
      jobcode: [
        this.data?.jobcode?.map((jobcode: { nameJobcode: any }) => jobcode.nameJobcode),
        { value: this.data?.jobcode.nameJobcode, disabled: this.isDisable },
      ],
      status: [{ value: this.data?.status, disabled: this.isDisable }],
    });
    this.editMemberForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.editMemberForm.dirty;
    });
  }

  getMemberById(id: any): void {
    this.data = this.member.dataSource.find((r) => r.id == id);
  }

  createForm(): void {
    this.editMemberForm = this.formBuilder.group({
      inputMember: { value: this.data?.nameMember },
      jobcode: [
        this.data?.jobcodes.map((jobcode: { nameJobcode: any }) => jobcode.nameJobcode) || [],
        { value: this.data?.jobcodes, disabled: this.isDisable },
      ],

      status: { value: this.data?.status },
    });
  }
}
