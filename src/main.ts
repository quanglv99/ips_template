import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppService } from './app/services/app.service';
import { APP_INITIALIZER } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'default/dashboard', pathMatch: 'full' },
  {
    path: 'default',
    loadChildren: () => import('./app/layout/default/default.route'),
  },
];

const initializerConfigFn = (appService: AppService) => {
  return () => {
    return appService.loadConfig();
  };
};


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializerConfigFn,
      multi: true,
      deps: [AppService],
    },
  ],
}).catch((err) => console.error(err));
