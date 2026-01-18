import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth';
import { DashboardSidebar } from './dashboard-sidebar/dashboard-sidebar';
import { RouterModule } from '@angular/router';
import { Footer } from '../../shared/footer/footer';
import { DashboardHeader } from './dashboard-header/dashboard-header';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, DashboardHeader, DashboardSidebar, Footer ],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout implements OnInit {

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const rol = this.auth.getUsuario()?.rol?.toLowerCase();
    if (!rol) {
      this.router.navigate(['/login']);
      return;
    }

    // Redirige según rol
    if (rol === 'adminc') this.router.navigate(['/dashboard/perfil-admin-c']);
    else if (rol === 'adminp') this.router.navigate(['/dashboard/perfil-admin-p']);
    else if (rol === 'profesor') this.router.navigate(['/dashboard/perfil-profesor']);
    else this.router.navigate(['/dashboard/perfil-alumno']);
  }
  
}
