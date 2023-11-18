import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyworkComponent } from '../mywork/mywork.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyworkService } from 'src/app/services/mywork.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-mywork-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  providers: [MyworkComponent],
  templateUrl: './mywork-detail.component.html',
  styleUrls: ['./mywork-detail.component.scss']
})
export class MyworkDetailComponent implements OnInit,OnDestroy {
  work:any
  private subscription!: Subscription;
  constructor(private myworkService:MyworkService,private mywork :MyworkComponent, private route:ActivatedRoute){

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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getMyWork(id:Number):void
  {
    this.work = this.mywork.dataSource.find(p => p.id === id)
  }
}
