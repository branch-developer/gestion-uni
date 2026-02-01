import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from '../../../services/cursos';
import { Evaluaciones } from '../../../services/evaluaciones';
import { AuthService } from '../../../services/auth';
import { Curso } from '../../../core/models/curso';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-profesor',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './perfil-profesor.html',
})
export class PerfilProfesorComponent implements OnInit {

  usuarioActual: any;
  rolUsuario: string = '';

  cursos: Curso[] = [];
  estudiantes: any[] = [];

  constructor(
    private router: Router,
    private cursosService: CursosService,
    private evaluacionesService: Evaluaciones,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Usuario actual
    this.usuarioActual = this.authService.getUsuario();
    this.rolUsuario = this.usuarioActual?.rol;

    // Cargar cursos del profesor
    if (this.rolUsuario === 'profesor') {
      this.cargarCursosProfesor();
      this.cargarHistorialEstudiantes();
    }
  }

  // ------------------ ESTUDIANTES ------------------
  cargarHistorialEstudiantes() {
    this.evaluacionesService.obtenerHistorial().subscribe({
      next: (res: any) => {
        // Filtramos para que el profesor solo vea los datos de sus cursos si es necesario,
        // o simplemente asignamos todo el historial como en el otro componente.
        this.estudiantes = res;
      },
      error: err => console.error('Error al cargar historial', err)
    });
  }

  contarCertificaciones() {
    // Cuenta los que ya están autorizados por el profesor
    return this.estudiantes.filter(e => e.aprobado && e.autorizado_profesor).length;
  }

  autorizarCertificacion(intentoId: number, nombre: string) {
    if (confirm(`¿Autorizar certificado para ${nombre}?`)) {
      this.evaluacionesService.autorizarCertificado(intentoId).subscribe({
        next: () => {
          alert('Certificado autorizado con éxito');
          this.cargarHistorialEstudiantes(); // Recargar lista
        },
        error: err => alert('Error al autorizar')
      });
    }
  }

  // ------------------ CURSOS ------------------
  cargarCursosProfesor() {
    this.cursosService.getCursos().subscribe({
      next: (cursos: Curso[]) => {
        this.cursos = cursos
          .filter(c => c.profesor === this.usuarioActual.id_usuario)
          .map(c => ({
            ...c,
            progreso: c.progreso || 0
          }));
      },
      error: err => console.error('Error al cargar cursos del profesor', err)
    });
  }

  autorizar() {
    this.router.navigate(['/dashboard/certificados/autorizar']);
  }

  crearCurso() {
    this.router.navigate(['/dashboard/crear-curso']);
  }

  eliminarCurso(curso: Curso) {
    if (confirm(`¿Deseas eliminar el curso "${curso.titulo}"?`)) {
      this.cursosService.eliminarCurso(curso.id).subscribe({
        next: () => {
          this.cursos = this.cursos.filter(c => c.id !== curso.id);
        },
        error: err => console.error('Error al eliminar curso', err)
      });
    }
  }

  contarEstudiantes(curso: Curso) {
    return curso.alumnos?.length || 0;
  }

  editarCurso(curso: Curso) {
    if (this.rolUsuario === 'profesor' && curso.profesor === this.usuarioActual.id_usuario) {
      this.router.navigate(['/dashboard/editar-curso', curso.id]);
    } else {
      alert('No tienes permiso para editar este curso.');
    }
  }

  // ------------------ LOGOUT ------------------
  cerrarSesion() {
    if (confirm('¿Deseas cerrar sesión?')) {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {}
      this.router.navigate(['/login']);
    }
  }
}
