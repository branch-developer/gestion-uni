import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilAdminPComponent } from './perfil-admin-p/perfil-admin-p';

const routes: Routes = [
  { path: '', component: PerfilAdminPComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPRoutingModule {}
