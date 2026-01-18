import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lecciones } from '../../../services/lecciones';
import { Leccion } from '../../../core/models/leccion';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';
import { AuthService } from '../../../services/auth';

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

  leccion!: Leccion;
  cursoId!: number;

  ngOnInit(): void {
    const leccionId = this.route.snapshot.paramMap.get('leccionId');
    if (!leccionId) {
      console.error('No se proporcionó leccionId en la URL');
      return;
    }

    this.leccionesService.getLeccionById(+leccionId).subscribe({
      next: (data) => {this.leccion = data; this.cursoId = data.curso_id; },
      error: (err) => {
        console.error('Error al cargar la lección', err);
        alert('No se pudo cargar la lección.');
      }
    });
  }

  get esProfesor(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.rol === 'profesor';
  }

  volverAlCurso(): void {
    if (!this.cursoId) {
      this.router.navigate(['/dashboard/mis-cursos']);
      return;
    }

    // Usamos el método getRol() de AuthService
    const rol = this.authService.getRol();

    if (rol === 'profesor') {
      // Si es profesor, a la edición
      this.router.navigate(['/dashboard/editar-curso', this.cursoId]);
    } else {
      // Si es estudiante, al detalle/temario
      this.router.navigate(['/dashboard/detalle-curso', this.cursoId]);
    }
  }

}
