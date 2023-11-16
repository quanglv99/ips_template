import { Route } from '@angular/router';
import { MyassignComponent } from './myassign.component';

export default [
  {
    path: '',
    component: MyassignComponent,
  },
  {
    path: 'add-my-assign',
    loadComponent: () =>
      import('../add-my-assign/add-my-assign.component').then(
        (r) => r.AddMyAssignComponent
      ),
  },
] as Route[];
