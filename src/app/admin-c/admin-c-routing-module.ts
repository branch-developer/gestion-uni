import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilAdminCComponent } from './perfil-admin-c/perfil-admin-c';

const routes: Routes = [
  {
    path: '',
    component: PerfilAdminCComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCRoutingModule {}
