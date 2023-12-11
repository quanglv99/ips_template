import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MembercontrolComponent } from '../membercontrol/membercontrol.component';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  providers: [MembercontrolComponent],
  templateUrl: './editmembers.component.html',
  styleUrls: ['./editmembers.component.scss']
})
export class EditmembersComponent implements OnInit, OnDestroy {
    jobcodes: any;
    private subscription!: Subscription;
    editMemberForm!: FormGroup;
    isDisable: boolean = false;
    isFormDirty: boolean = false;
    data: any;

    constructor(
      private formBuilder: FormBuilder,
      private appService: AppService,
      private http: HttpClient,
      private route: ActivatedRoute,
      private memberService: MemberService,
      private member: MembercontrolComponent
    ) { }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();

    }
    ngOnInit(): void {
      this.initData();
      this.subscription = this.memberService.getMemberData().subscribe((data) => {
        if (data) {
          this.data = data;
          console.log("data", this.data)
        } else {
          const id = Number(this.route.snapshot.paramMap.get('id'));
          if (id) {
            this.getMemberDetail(id);
          }
        }
      });
      this.initializeForm()
    }
    getMemberDetail(id: number): void {
      this.data = this.member.dataSource.find((p: { id: number; }) => p.id === id)
    }



    initData() {
      const e_url = this.appService.getJobcodeList();
      this.http.get(e_url).subscribe((result: any) => {
        this.jobcodes = result;
      });
    }

    initializeForm() {
      this.editMemberForm = this.formBuilder.group({
        nameMember: [this.data.nameMember],
        jobcodes: [[]],
        note: [''],
      });

      this.editMemberForm.valueChanges.subscribe(() => {
        this.isFormDirty = this.editMemberForm.dirty;
      });
    }
  updateMembers(): void {

  }

}
