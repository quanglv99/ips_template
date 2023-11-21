import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParameterconfigurationService {

  private parameterConfigurationData = new BehaviorSubject<any>(null);

  setParameterConfigurationData(data: any): void{
    this.parameterConfigurationData.next(data);
  }
  getParameterConfigurationData(): Observable<any>{
    return this.parameterConfigurationData.asObservable();
  }

}
