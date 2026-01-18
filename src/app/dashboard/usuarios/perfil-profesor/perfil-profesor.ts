import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from '../../../services/cursos';
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

  profesor = {
    nombre: 'Nombre del Profesor',
    especialidad: 'Desarrollo Web y Bases de Datos'
  };

  foto: string = 'https://via.placeholder.com/150';

  constructor(
    private router: Router,
    private cursosService: CursosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Usuario actual
    this.usuarioActual = this.authService.getUsuario();
    this.rolUsuario = this.usuarioActual?.rol;

    // Cargar cursos del profesor
    if (this.rolUsuario === 'profesor') {
      this.cargarCursosProfesor();
    }

    // Cargar estudiantes (puedes traerlos del backend también)
    this.cargarEstudiantes();
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

  // ------------------ ESTUDIANTES ------------------
  cargarEstudiantes() {
    // Por simplicidad, aquí se usa un array estático. Mejor traerlo del backend
    this.estudiantes = [
      { correo: 'juan.perez@example.com', cursoId: 1, estado: 'Aprobado' },
      { correo: 'ana.gomez@example.com', cursoId: 1, estado: 'Viendo Curso' },
      { correo: 'carlos.ruiz@example.com', cursoId: 2, estado: 'No Aprobado' }
    ];
  }

  contarCertificaciones() {
    return this.estudiantes.filter(e => e.estado === 'Aprobado').length;
  }

  autorizarCertificacion(correo: string) {
    alert(`Certificación autorizada para ${correo}`);
  }

  // ------------------ FOTO ------------------
  cambiarFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.foto = e.target?.result as string;
      reader.readAsDataURL(file);
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
