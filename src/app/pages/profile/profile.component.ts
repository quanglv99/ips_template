import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatDividerModule,MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  fileChosen:boolean = false

  onFileSelected(event: any, fileType: string): void {
    this.fileChosen = event.target.files.length > 0;
  }
}
