import { Routes } from '@angular/router';
import { PerfilAlumnoComponent } from './estudiantes/perfil-alumno/perfil-alumno';

export const routes: Routes = [
  {
    path: 'estudiantes/perfil-alumno',
    component: PerfilAlumnoComponent
  },
  {
    path: '',
    redirectTo: 'estudiantes/perfil-alumno',
    pathMatch: 'full'
  }
];
