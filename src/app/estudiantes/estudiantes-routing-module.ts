import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'perfil-alumno', loadComponent: () => import('./perfil-alumno/perfil-alumno').then(m => m.PerfilAlumnoComponent) },
  { path: 'mis-cursos', loadComponent: () => import('./mis-cursos/mis-cursos').then(m => m.MisCursosComponent) },
  { path: 'cursos-disponibles', loadComponent: () => import('./cursos-disponibles/cursos-disponibles.component').then(m => m.CursosDisponiblesComponent) },
  { path: 'detalle-curso', loadComponent: () => import('./detalle-curso/detalle-curso.component').then(m => m.DetalleCursoComponent) },
  { path: 'evaluacion', loadComponent: () => import('./evaluacion/evaluacion.component').then(m => m.EvaluacionComponent) },
  { path: '', redirectTo: 'perfil-alumno', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule {}
