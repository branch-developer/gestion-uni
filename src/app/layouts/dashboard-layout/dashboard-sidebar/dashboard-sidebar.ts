import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, Router} from '@angular/router';
import { AuthService } from '../../../services/auth';
import { Usuario } from '../../../core/models/user';

interface SubLink {
  nombre: string;
  ruta: string;
}

interface Link {
  nombre: string;
  ruta?: string;
  sublinks?: SubLink[];
}

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink,],
  templateUrl: './dashboard-sidebar.html',
})

export class DashboardSidebar {

  usuario: Usuario | null = null;

  constructor(private auth: AuthService, private router: Router) {
    // Siempre tomamos el usuario del AuthService
    this.usuario = this.auth.getUsuario();
  }

  get links(): Link[] {
    const rol = this.usuario?.rol?.toLowerCase() || 'estudiante';
    const cursos = this.usuario?.cursos || [];
    
    switch (rol) {
      case 'profesor':
        return [
          { nombre: 'Inicio', ruta: '/dashboard/perfil-profesor' },
          {
              nombre: `Cursos`,
              sublinks: [
                {
                  nombre: 'Mis Cursos',
                  ruta: '/dashboard/mis-cursos'
                },
                {
                  nombre: 'Crear Curso',
                  ruta: '/dashboard/crear-curso'
                },
                {
                  nombre: 'Autorizar Certificados',
                  ruta: '/dashboard/certificados/autorizar'
                },
              ]
          },          
        ];

      case 'adminc':
        return [
          { nombre: 'Inicio', ruta: '/dashboard/perfil-admin-c' },
          {
            nombre: 'Cursos',
            sublinks: [
              { nombre: 'Lista de cursos', ruta: '/dashboard/cursos-disponibles' },
              { nombre: 'Crear Curso', ruta: '/dashboard/crear-curso' }
            ]
          },
          {
            nombre: 'Exportar Certificados',
            ruta: '/dashboard/certificados/exportar'
          },
          {
            nombre: 'Usuarios',
            sublinks: [
              { nombre: 'Lista de usuarios', ruta: '/dashboard/usuarios' },
              { nombre: 'Crear Usuario', ruta: '/dashboard/usuarios/crear' }
            ]
          }
        ];

      case 'adminp':
        return [
          { nombre: 'Inicio', ruta: '/dashboard/perfil-admin-p' },
          {
            nombre: 'Pagos',
            sublinks: [
              { nombre: 'Pagos Pendientes', ruta: '/dashboard/pagos/pendientes' },
              { nombre: 'Historial de pagos', ruta: '/dashboard/pagos/historial' }
            ]
          },
        ];

      default:
        return [
          { nombre: 'Perfil', ruta: '/dashboard/perfil-alumno' },
          { nombre: 'Mis Cursos', ruta: '/dashboard/mis-cursos' },
          { nombre: 'Cursos Disponibles', ruta: '/dashboard/cursos-disponibles' },          
          {
            nombre: 'Pagos',
            sublinks: [
              { nombre: 'Historial de Pagos', ruta: '/dashboard/pagos/historial' }
            ]
          }
        ];
    }
  }
}
