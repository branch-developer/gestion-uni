import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPRoutingModule } from './admin-p-routing-module';
import { PerfilAdminPComponent } from './perfil-admin-p/perfil-admin-p';

@NgModule({
  imports: [
    CommonModule,
    AdminPRoutingModule,
    PerfilAdminPComponent
  ]
})
export class AdminPModule {}