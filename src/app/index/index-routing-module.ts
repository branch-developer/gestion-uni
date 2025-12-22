// src/app/index/index-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index';
import { ContactoComponent } from './contacto/contacto';
import { CursosComponent } from './cursos/cursos';
import { InscripcionComponent } from './inscripcion/inscripcion';
import { SobrenosotrosComponent } from './sobrenosotros/sobrenosotros';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
    path: 'cursos',
    component: CursosComponent
  },
  {
    path: 'inscripcion',
    component: InscripcionComponent
  },
  {
    path: 'sobrenosotros',
    component: SobrenosotrosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {}
