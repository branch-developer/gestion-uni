import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lecciones } from '../../../services/lecciones';
import { Leccion } from '../../../core/models/leccion';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';

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

  leccion!: Leccion;
  cursoId!: number;

  ngOnInit(): void {
    const leccionId = this.route.snapshot.paramMap.get('leccionId');
    if (!leccionId) {
      console.error('No se proporcionó leccionId en la URL');
      return;
    }

    this.leccionesService.getLeccionById(+leccionId).subscribe({
      next: (data) => {this.leccion = data; this.cursoId = data.modulo; },
      error: (err) => {
        console.error('Error al cargar la lección', err);
        alert('No se pudo cargar la lección. Intenta nuevamente.');
      }
    });
  }

  volverAlCurso(): void {
    this.router.navigate(['/dashboard/editar-curso', this.cursoId]);
  }

}
