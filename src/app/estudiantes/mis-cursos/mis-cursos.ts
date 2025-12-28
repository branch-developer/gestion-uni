import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  progreso?: number;
  paginas?: { titulo: string, contenido: string }[];
}

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-cursos.html',
  styles: [`
    :host { display: block; }
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-in { animation: fade-in 0.4s cubic-bezier(0, 0, 0.2, 1); }
  `]
})
export class MisCursosComponent {
  cursosInscritos: Curso[] = [
    {
      id: 1,
      titulo: 'Matemática Avanzada',
      descripcion: 'Cálculo integral y series de Fourier.',
      progreso: 60,
      paginas: [
        { titulo: 'Derivadas Parciales', contenido: 'Una derivada parcial...' },
        { titulo: 'Integrales de Línea', contenido: 'Una integral de línea...' }
      ]
    },
    {
      id: 2,
      titulo: 'Física Moderna',
      descripcion: 'Relatividad y mecánica cuántica.',
      progreso: 30
    }
  ];

  constructor(private router: Router) {}

  volverPerfil() {
    this.router.navigate(['/estudiantes/perfil-alumno']);
  }

  verDetalleCurso(curso: Curso) {
    this.router.navigate(['/estudiantes/detalle-curso'], { state: { curso } });
  }
}
