import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCRoutingModule } from './admin-c-routing-module';
import { PerfilAdminCComponent } from './perfil-admin-c/perfil-admin-c';


@NgModule({
  imports: [
    CommonModule,
    AdminCRoutingModule,
    PerfilAdminCComponent
  ]
})
export class AdminCModule { }
