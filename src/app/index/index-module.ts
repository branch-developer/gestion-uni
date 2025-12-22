import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing-module';
import { IndexComponent } from './index';
import { ContactoComponent } from './contacto/contacto';
import { CursosComponent } from './cursos/cursos';
import { InscripcionComponent } from './inscripcion/inscripcion';
import { SobrenosotrosComponent } from './sobrenosotros/sobrenosotros';

@NgModule({
  declarations: [
    ContactoComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    IndexComponent,
    CursosComponent,
    InscripcionComponent,
    SobrenosotrosComponent
  ]
})
export class IndexModule {}
