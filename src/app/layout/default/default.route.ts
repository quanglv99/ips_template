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
        path: 'mywork',
        loadChildren: () =>
          import('../../pages/mywork/mywork.route')
      },
      {
        path: 'workforme',
        loadComponent: () =>
          import('../../pages/workforme/workforme.component').then(
            (c) => c.WorkformeComponent
          ),
      },
      {
        path: 'myassign',
        loadComponent: () =>
          import('../../pages/myassign/myassign.component').then(
            (c) => c.MyassignComponent
          ),
      },
      {
        path: 'acceptassign',
        loadComponent: () =>
          import('../../pages/acceptassign/acceptassign.component').then(
            (c) => c.AcceptassignComponent
          ),
      },
      {
        path: 'approveassign',
        loadComponent: () =>
          import('../../pages/approveassign/approveassign.component').then(
            (c) => c.ApproveassignComponent
          ),
      },
      {
        path: 'config',
        loadComponent: () =>
          import('../../pages/config/config.component').then(
            (c) => c.ConfigComponent
          ),
      },
      {
        path: 'setting',
        loadComponent: () =>
          import('../../pages/setting/setting.component').then(
            (c) => c.SettingComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../../pages/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
    ],
  },
] as Route[];
