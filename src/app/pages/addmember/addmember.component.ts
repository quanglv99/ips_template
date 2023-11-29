import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule,Validators,FormGroup,FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-addmember',
  standalone: true,
  imports: [
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
    MatDividerModule

  ],
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.scss']
})
export class AddmemberComponent {
  toppings = new FormControl('');
  toppingList: string[] = ['Thành phần 1', 'Thành phần 2', 'Thành phần 3'];
  addMemberForm! : FormGroup
  constructor(private formBuilder: FormBuilder,){

  }

  ngOnInit(): void {
    this.addMemberForm = this.formBuilder.group({
      inputMember: ['', Validators.required],
      jobcode: ['', Validators.required],
      note: ['']
    });
  }
}
