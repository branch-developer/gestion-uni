import { Component, signal } from '@angular/core';
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
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-curso.html',
  styles: [`
    :host { display: block; }
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-in { animation: fade-in 0.4s cubic-bezier(0, 0, 0.2, 1); }
  `]
})
export class DetalleCursoComponent {
  cursoActivo = signal<Curso | null>(null);

  constructor(private router: Router) {
    // Get curso from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.cursoActivo.set(navigation.extras.state['curso']);
    }
  }

  get curso() {
    return this.cursoActivo();
  }

  // Función para volver a la lista de cursos del alumno
  volverMisCursos() {
    this.router.navigate(['/estudiantes/mis-cursos']);
  }

  // Función para ir a la evaluación del curso
  irAEvaluacion() {
    this.router.navigate(['/estudiantes/evaluacion']);
  }
}
