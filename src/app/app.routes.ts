import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';

import { PerfilAlumnoComponent } from './estudiantes/perfil-alumno/perfil-alumno';
import { MisCursosComponent } from './estudiantes/mis-cursos/mis-cursos';
import { CursosDisponiblesComponent } from './estudiantes/cursos-disponibles/cursos-disponibles';
import { DetalleCursoComponent } from './estudiantes/detalle-curso/detalle-curso';
import { EvaluacionComponent } from './estudiantes/evaluacion/evaluacion';

import { PerfilAdminCComponent } from './admin-c/perfil-admin-c/perfil-admin-c';
import { PerfilProfesorComponent } from './profesor/perfil-profesor/perfil-profesor';

export const routes: Routes = [
  // Ruta por defecto: LOGIN
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login
  { path: 'login', component: LoginComponent },

  // Rutas de estudiantes
  {
    path: 'estudiantes',
    children: [
      { path: 'perfil-alumno', component: PerfilAlumnoComponent },
      { path: 'mis-cursos', component: MisCursosComponent },
      { path: 'cursos-disponibles', component: CursosDisponiblesComponent },
      { path: 'evaluacion', component: EvaluacionComponent },
      { path: 'detalle-curso', component: DetalleCursoComponent }
    ]
  },

  // Rutas admin C
  { path: 'admin-c', component: PerfilAdminCComponent },

  // Rutas profesor
  {
    path: 'profesor',
    children: [
      { path: 'perfil-profesor', component: PerfilProfesorComponent }
    ]
  },

  // Módulo admin-p
  {
    path: 'admin-p',
    loadChildren: () =>
      import('./admin-p/admin-p-module').then(m => m.AdminPModule)
  },

  // Wildcard al login
  { path: '**', redirectTo: 'login' }
];
