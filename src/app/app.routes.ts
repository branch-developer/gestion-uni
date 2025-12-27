import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index-module').then(m => m.IndexModule)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.LoginComponent)
  },
  {
    path: 'estudiantes',
    loadChildren: () => import('./estudiantes/estudiantes-module').then(m => m.EstudiantesModule)
  },
  {
    path: 'profesor/perfil-profesor',
    loadComponent: () => import('./profesor/perfil-profesor/perfil-profesor').then(m => m.PerfilProfesorComponent)
  },
  {
    path: 'admin-c',
    loadComponent: () => import('./admin-c/perfil-admin-c/perfil-admin-c').then(m => m.PerfilAdminCComponent)
  },
  {
    path: 'admin-p',
    loadComponent: () => import('./admin-p/perfil-admin-p/perfil-admin-p').then(m => m.PerfilAdminPComponent)
  }
];
