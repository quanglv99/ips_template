import { Route } from '@angular/router';
import { MembercontrolComponent } from './membercontrol.component';

export default [
  { path: '', component: MembercontrolComponent },
  {
    path: 'add-member',
    loadComponent: () => import('../addconfig/addconfig.component').then(r => r.AddconfigComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('../editmembers/editmembers.component').then(r => r.EditmembersComponent)
  }
] as Route[]
