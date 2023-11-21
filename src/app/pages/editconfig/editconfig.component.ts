import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ConfigComponent } from '../config/config.component';
import { ParameterconfigurationService } from 'src/app/services/parameterconfiguration.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editconfig',
  standalone: true,
  imports: [CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule],
  providers: [ConfigComponent],
  templateUrl: './editconfig.component.html',
  styleUrls: ['./editconfig.component.scss']
})
export class EditconfigComponent implements OnInit,OnDestroy {
  data: any;
  subscription!: Subscription
  members = new FormControl('');
  memberList: string[] = ['Thành phần 1', 'Thành phần 2', 'Thành phần 3'];
  editConfigForm!: FormGroup
  isDisable: boolean = false;
  isFormDirty: boolean = false;
  constructor(private formBuilder: FormBuilder,private config: ConfigComponent , private dataService: ParameterconfigurationService, private route: ActivatedRoute ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.dataService.getParameterConfigurationData().subscribe(
      data =>
      {
        if(data)
        {
          this.data = data
        }else
        {
          const id = Number(this.route.snapshot.paramMap.get('id'));
          if(id)
          {
            this.getConfigById(id);
          }
        }
        this.createForm()
      }
    );


    this.editConfigForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.editConfigForm.dirty;
    });
    console.log("hihi", this.data)
    this.editConfigForm = this.formBuilder.group({
      inputConfig: [{ value: this.data.nameConfig, disabled: this.isDisable}],
      ingredientConfig: [{ value: this.data.ingredientConfig, disabled: this.isDisable}],
      noteConfig: [{ value: this.data.noteConfig, disabled: this.isDisable}],
    });

    this.editConfigForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.editConfigForm.dirty;
    });
  }

  getConfigById(id:any):void
  {
    this.data = this.config.dataSource.find(r => r.id)
  }

  createForm():void
  {
    this.editConfigForm = this.formBuilder.group({
      inputConfig: { value: this.data?.nameConfig},
      ingredientConfig: { value: this.data?.ingredientConfig},
      noteConfig: { value: this.data?.noteConfig}
    });
    console.log("woww", this.data?.nameConfig)
  }
}
