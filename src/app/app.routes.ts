import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index-module').then(m => m.IndexModule)
  }
];
