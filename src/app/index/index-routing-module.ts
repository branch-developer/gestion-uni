// src/app/index/index-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./index').then(m => m.IndexComponent)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./contacto/contacto').then(m => m.ContactoComponent)
  },
  {
    path: 'cursos',
    loadComponent: () => import('./cursos/cursos').then(m => m.CursosComponent)
  },
  {
    path: 'inscripcion',
    loadComponent: () => import('./inscripcion/inscripcion').then(m => m.InscripcionComponent)
  },
  {
    path: 'sobrenosotros',
    loadComponent: () => import('./sobrenosotros/sobrenosotros').then(m => m.SobrenosotrosComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {}
