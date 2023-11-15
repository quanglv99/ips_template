import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyworkService {

  private myWorkData = new BehaviorSubject<any>(null);

  setMyWorkData(data: any): void {
    this.myWorkData.next(data);
  }

  getMyWorkData(): Observable<any> {
    return this.myWorkData.asObservable();
  }
}
