import { Routes } from '@angular/router';
import { PerfilAlumnoComponent } from './estudiantes/perfil-alumno/perfil-alumno';
import { MisCursosComponent } from './estudiantes/mis-cursos/mis-cursos';
import { CursosDisponiblesComponent } from './estudiantes/cursos-disponibles/cursos-disponibles';
import { DetalleCursoComponent } from './estudiantes/detalle-curso/detalle-curso';
import { EvaluacionComponent } from './estudiantes/evaluacion/evaluacion';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  // Ruta por defecto: LOGIN
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },

  // Login
  { 
    path: 'login', 
    component: LoginComponent 
  },

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

  // Wildcard al login
  {
    path: '**',
    redirectTo: 'login'
  }
];
