import { Routes } from '@angular/router';
import { PerfilAdminCComponent } from './admin-c/perfil-admin-c/perfil-admin-c';
import { PerfilProfesorComponent } from './profesor/perfil-profesor/perfil-profesor';

export const routes: Routes = [
  { path: '', redirectTo: 'admin-c', pathMatch: 'full' },
  { path: 'admin-c', component: PerfilAdminCComponent },
  { path: 'profesor',
    children: [
      { path: 'perfil-profesor', component: PerfilProfesorComponent},
    ]
    }
];
  