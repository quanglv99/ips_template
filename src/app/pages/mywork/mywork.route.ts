import { Route } from '@angular/router';
import { MyworkComponent } from './mywork.component';

export default [
  { path: '', component: MyworkComponent },
  {
    path: 'addwork', 
    loadComponent: () => import('../add-work/add-work.component').then(r => r.AddWorkComponent)
  },
  { path: ':id', loadComponent: () => import('../mywork-detail/mywork-detail.component').then(r => r.MyworkDetailComponent) },
  
] as Route[]
