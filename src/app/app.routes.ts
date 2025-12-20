import { Routes } from '@angular/router';
import { PerfilAlumnoComponent } from './estudiantes/perfil-alumno/perfil-alumno';
import { MisCursosComponent } from './estudiantes/mis-cursos/mis-cursos';
import { CursosDisponiblesComponent } from './estudiantes/cursos-disponibles/cursos-disponibles';
import { DetalleCursoComponent } from './estudiantes/detalle-curso/detalle-curso';
import { EvaluacionComponent } from './estudiantes/evaluacion/evaluacion';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  // Ruta por defecto: que vaya al login
  { 
    path: '', 
    redirectTo: 'login', pathMatch: 'full' 
  },

  // Login
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'estudiantes/perfil-alumno',
    component: PerfilAlumnoComponent
  },
  {
    path: 'estudiantes/mis-cursos',
    component: MisCursosComponent
  },
  {
    path: 'estudiantes/cursos-disponibles',
    component: CursosDisponiblesComponent
  },
  { 
    path: 'curso', 
    component: DetalleCursoComponent 
  },
  { 
    path: 'estudiantes/evaluacion', 
    component: EvaluacionComponent 
  },
  {
    path: '',
    redirectTo: 'estudiantes/perfil-alumno',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'estudiantes/perfil-alumno'
  }
]; 