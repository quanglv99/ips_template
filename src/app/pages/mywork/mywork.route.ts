import { Route } from '@angular/router';
import { MyworkComponent } from './mywork.component';

export default [
  { path: '', component: MyworkComponent },
  {
    path: 'add-work', 
    loadComponent: () => import('../add-work/add-work.component').then(r => r.AddWorkComponent)
  },
] as Route[]
