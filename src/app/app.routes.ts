import { Routes } from '@angular/router';
import { PerfilAdminCComponent } from './admin-c/perfil-admin-c/perfil-admin-c';

export const routes: Routes = [
  { path: '', redirectTo: 'admin-c', pathMatch: 'full' },
  { path: 'admin-c', component: PerfilAdminCComponent }
];
