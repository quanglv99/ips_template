import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatDividerModule,MatButtonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor( private formBuilder :FormBuilder){

  }
  ngOnInit(): void {
    this.biometricForm = this.formBuilder.group({
      imgFront:  ['', Validators.required], 
      imgBack:  ['', Validators.required], 
      imgAvt:  ['', Validators.required], 
      file:  [''], 
    })
  }
  biometricForm! : FormGroup
  fileChosen:boolean = false

  onFileSelected(event: any, fileType: string): void {
    this.fileChosen = event.target.files.length > 0;
  }
}
