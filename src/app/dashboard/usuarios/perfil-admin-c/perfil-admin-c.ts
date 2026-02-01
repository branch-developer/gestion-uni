import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { CursosService } from '../../../services/cursos';
import { Evaluaciones } from '../../../services/evaluaciones';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-admin-c',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-admin-c.html',
})
export class PerfilAdminCComponent {

  usuarioActual: any;
  rolUsuario: string = '';

  // Variables para datos reales
  estudiantes: any[] = [];
  cursos: any[] = [];
  promedioGeneral: number = 0;
  certificadosAutorizados: number = 0;
  estudiantesAutorizados: any[] = [];

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private cursosService: CursosService,
    private evaluacionesService: Evaluaciones
  ) {}

  ngOnInit(): void {
    // Usuario actual
    this.usuarioActual = this.authService.getUsuario();
    this.cargarEstudiantes();
    this.cargarCursos();
    this.cargarAutorizados();
  }

  cargarEstudiantes() {
    this.authService.getUsuarios().subscribe({
      next: (data) => {
        // Filtramos para contar solo los que tienen rol 'estudiante'
        this.estudiantes = data.filter(u => u.rol === 'estudiante');
        this.cargarEstadisticasCertificados();
      },
      error: (err) => console.error('Error al cargar estudiantes:', err)
    });
  }

  cargarCursos() {
    this.cursosService.getCursos().subscribe({
      next: (data) => {
        this.cursos = data;
      },
      error: (err) => console.error('Error al cargar cursos:', err)
    });
  }

  cargarEstadisticasCertificados() {
    this.evaluacionesService.obtenerHistorial().subscribe({
      next: (historial: any[]) => {
        // 1. Contar los que ya están firmados/autorizados
        this.certificadosAutorizados = historial.filter(h => h.aprobado && h.autorizado_profesor).length;
      },
      error: (err) => console.error('Error al cargar historial', err)
    });
  }

  cargarAutorizados() {
    this.evaluacionesService.getTodosLosAutorizados().subscribe({
      next: (data) => {
        this.estudiantesAutorizados = data;
      },
      error: (err) => console.error('Error al cargar progreso:', err)
    });
  }

  logout() {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}
    this.router.navigate(['/login']);
  }

}