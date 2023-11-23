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
import { ConfigComponent } from '../config/config.component';
import { ActivatedRoute } from '@angular/router';
import { MEMBER_LIST } from 'src/app/shared/member-value';
import { ConfigService } from 'src/app/services/config.service';
import { MemberService } from 'src/app/services/member.service';

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
  templateUrl: './editmembers.component.html',
  styleUrls: ['./editmembers.component.scss']
})
export class EditmembersComponent {
  data: any;
  subscription!: Subscription;
  members = new FormControl('');
  memberList = MEMBER_LIST;
  editMemberForm!: FormGroup;
  isDisable: boolean = false;
  isFormDirty: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private config: ConfigComponent,
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
      inputConfig: [{ value: this.data.nameConfig, disabled: this.isDisable }],
      members: [
        this.data.members.map((member: { name: any }) => member.name),
        { value: this.data.members, disabled: this.isDisable },
      ],
      noteConfig: [{ value: this.data.noteConfig, disabled: this.isDisable }],
    });

    this.editMemberForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.editMemberForm.dirty;
    });
  }

  getMemberById(id: any): void {
    this.data = this.config.dataSource.find((r) => r.id);
  }

  createForm(): void {
    this.editMemberForm = this.formBuilder.group({
      inputConfig: { value: this.data?.nameConfig },
      ingredientConfig: { value: this.data?.ingredientConfig },
      noteConfig: { value: this.data?.noteConfig },
    });
  }
}
