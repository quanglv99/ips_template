import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'default/dashboard', pathMatch: 'full' },
  {
    path: 'default', 
    loadChildren: () => import('./layout/default/default.route'),
  },

];
