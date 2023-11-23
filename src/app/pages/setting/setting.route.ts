import { Route } from '@angular/router';
import { SettingComponent } from './setting.component';

export default [
  { path: '', component: SettingComponent},
  {
    path: 'config',
    loadChildren: () => import('../../pages/config/config.route'),
  },

  {
    path: 'member',
    loadChildren: () => import('../../pages/membercontrol/membercontrol.route')
  },

] as Route;
