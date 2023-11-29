import { Route } from '@angular/router';
import { MembercontrolComponent } from './membercontrol.component';

export default [
  { path: '', component: MembercontrolComponent },
  {
    path: 'add-member',
    loadComponent: () => import('../addmember/addmember.component').then(r => r.AddmemberComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../editmembers/editmembers.component').then(r => r.EditmembersComponent)
  }
] as Route[]
