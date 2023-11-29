import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private appConfig: any;
  constructor(private http: HttpClient) {}

  loadConfig(){
    return this.http
          .get('assets/config.json')
          .toPromise()
          .then((data) => {
            this.appConfig = data;
          })
  }

  getWorkList():string{
    return this.appConfig.WORK_LIST
  }

  getEmployees():string{
    return this.appConfig.EMPLOYEES
  }

  getWorkStatus():string{
    return this.appConfig.WORK_STATUS
  }
  getAssignStatus():string{
    return this.appConfig.ASSIGN_STATUS
  }

  getAssignList():string{
    return this.appConfig.ASSIGN_LIST
  }

  getUserDetail():string{
    return this.appConfig.USER_DETAIL
  }

}

