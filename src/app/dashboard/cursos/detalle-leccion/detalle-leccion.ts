import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lecciones } from '../../../services/lecciones';
import { Leccion } from '../../../core/models/leccion';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';
import { AuthService } from '../../../services/auth';
import { CursosService } from '../../../services/cursos';

@Component({
  selector: 'app-detalle-leccion',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './detalle-leccion.html',
})
export class DetalleLeccion implements OnInit {
  private route = inject(ActivatedRoute);
  private leccionesService = inject(Lecciones);
  private router = inject(Router);
  public authService = inject(AuthService);
  private cursosService = inject(CursosService); // Corregido nombre de variable

  leccion: Leccion | null = null;
  cursoId!: number;
  cargando: boolean = false;

  ngOnInit(): void {
    // Escuchamos cambios en los parámetros de la URL de forma reactiva
    this.route.paramMap.subscribe(params => {
      const id = params.get('leccionId');
      if (id) {
        this.cargarDatosLeccion(+id);
      }
    });
  }

  cargarDatosLeccion(id: number): void {
    this.cargando = true;
    this.leccion = null; // Limpiar para evitar errores de renderizado

    this.leccionesService.getLeccionById(id).subscribe({
      next: (data) => {
        this.leccion = data;
        this.cursoId = data.curso_id || 0;
        this.cargando = false;
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll arriba al cambiar lección
      },
      error: (err) => {
        console.error('Error al cargar lección', err);
        this.cargando = false;
        this.router.navigate(['/dashboard/mis-cursos']);
      }
    });
  }

  volverAlCurso(): void {
    const rol = this.authService.getRol();
    const targetRoute = rol === 'profesor' ? '/dashboard/editar-curso' : '/dashboard/detalle-curso';
    
    if (this.cursoId) {
      this.router.navigate([targetRoute, this.cursoId]);
    } else {
      this.router.navigate(['/dashboard/mis-cursos']);
    }
  }

  completarYSiguiente() {
    if (!this.leccion) return;

    this.leccionesService.completarLeccion(this.leccion.id).subscribe({
      next: () => {
        this.cursosService.actualizarCursosAlumno();

        if (this.leccion?.siguiente_leccion_id) {
          // Navegamos a la siguiente lección dentro del mismo componente
          this.router.navigate(['/dashboard/curso/detalle-leccion', this.leccion.siguiente_leccion_id]);
        } else {
          alert('¡Felicidades! Has terminado todas las lecciones del curso.');
          this.router.navigate(['/dashboard/detalle-curso', this.cursoId]);
        }
      },
      error: (err) => console.error('Error al completar lección', err)
    });
  }
}