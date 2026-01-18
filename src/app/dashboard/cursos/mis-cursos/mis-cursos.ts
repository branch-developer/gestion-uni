import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CursosService } from '../../../services/cursos';
import { AuthService } from '../../../services/auth';
import { Curso, CursoDetalle } from '../../../core/models/curso';

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-cursos.html',
  styles: [`
    :host { display: block; }
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-in { animation: fade-in 0.4s cubic-bezier(0, 0, 0.2, 1); }
  `]
})

export class MisCursosComponent implements OnInit {
  cursosInscritos: Curso[] = [];
  rolUsuario = '';
  usuarioActual: any;

  constructor(private router: Router,private cursosService: CursosService, private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioActual = this.authService.getUsuario();
    this.rolUsuario = this.usuarioActual?.rol;

    if (this.rolUsuario === 'profesor') {
      this.cursosService.getMisCursosProfesor().subscribe({
        next: (cursos) => {
          this.cursosInscritos = cursos.map(c => ({ ...c, progreso: 0 }));
        },
        error: (err) => console.error('Error al cargar cursos del profesor', err)
      });
    } else {
      // Suscribirse a los cambios en los cursos del alumno
      this.cursosService.cursosAlumnoObservable$.subscribe((cursos) => {
        this.cursosInscritos = cursos.map(c => ({ ...c, progreso: c.progreso ?? 0 }));
      });

      // Cargar inicialmente
      this.cursosService.actualizarCursosAlumno();
    }
  }

  cargarCursos() {
    // Aseguramos que el usuario ya esté cargado
    this.usuarioActual = this.authService.getUsuario();
    this.rolUsuario = this.usuarioActual?.rol;

    if (this.rolUsuario === 'profesor') {
      // Cursos creados por el profesor
      this.cursosService.getMisCursosProfesor().subscribe({
        next: (cursos) => {
          this.cursosInscritos = cursos.map(c => ({
            ...c,
            progreso: 0 // los profesores no “avanzan” cursos
          }));
        },
        error: (err) => {
          console.error('Error al cargar cursos del profesor', err);
        }
      });

    } else {
      // Cursos comprados por el alumno
      this.cursosService.getMisCursosAlumno().subscribe({
        next: (cursos) => {
          this.cursosInscritos = cursos.map(c => ({
            ...c,
            progreso: c.progreso ?? 0
          }));
        },
        error: (err) => {
          console.error('Error al cargar cursos del alumno', err);
        }
      });
    }
  }


  trackById(index: number, curso: any): number {
    return curso.id;
  }

  volverPerfil() {
    this.router.navigate(['/dashboard/perfil-alumno']);
  }

  verDetalleCurso(curso: Curso) {
    this.router.navigate(['/dashboard/detalle-curso', curso.id]);
  }

  editarCurso(curso: Curso) {
    // Solo permitir editar si el usuario es profesor y es el dueño del curso
    if (this.rolUsuario === 'profesor' && curso.profesor === this.usuarioActual.id_usuario) {
      this.router.navigate(['/dashboard/editar-curso', curso.id]);
    } else {
      alert('No tienes permiso para editar este curso.');
    }
  }


}
