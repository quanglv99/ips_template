import { Route } from '@angular/router';
import { DefaultComponent } from './default.component';

export default [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'my-work',
        loadChildren: () =>
          import('../../pages/mywork/mywork.route')
      },
      {
        path: 'work-for-me',
        loadComponent: () =>
          import('../../pages/workforme/workforme.component').then(
            (c) => c.WorkformeComponent
          ),
      },
      {
        path: 'my-assign',
        loadChildren: () =>
          import('../../pages/myassign/my-assign.route')
      },
      {
        path: 'accept-assign',
        loadComponent: () =>
          import('../../pages/acceptassign/acceptassign.component').then(
            (c) => c.AcceptassignComponent
          ),
      },
      {
        path: 'approve-assign',
        loadComponent: () =>
          import('../../pages/approveassign/approveassign.component').then(
            (c) => c.ApproveassignComponent
          ),
      },
      {
        path: 'jobcode',
        loadChildren: () =>
          import('../../pages/jobcode/jobcode.route')
      },

      {
        path: 'setting',
        loadChildren: () =>
          import('../../pages/setting/setting.route')
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../../pages/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      { path: '**', redirectTo: 'dashboard' }
    ],
  },
] as Route[];
