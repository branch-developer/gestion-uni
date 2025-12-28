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
  selector: 'app-cursos-disponibles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursos-disponibles.html'
})
export class CursosDisponiblesComponent {
  catalogo: Curso[] = [
    { 
      id: 2, 
      titulo: 'Introducción a la Programación', 
      descripcion: 'Lógica algorítmica y fundamentos de JS.',
      paginas: [
        { titulo: 'Conceptos Básicos', contenido: 'Introducción a variables y tipos de datos.' },
        { titulo: 'Estructuras de Control', contenido: 'Uso de if, else, for y while.' }
      ]
    },
    { 
      id: 3, 
      titulo: 'Historia Universal', 
      descripcion: 'Desde la revolución industrial hasta hoy.',
      paginas: [
        { titulo: 'Revolución Industrial', contenido: 'Impacto social y económico.' },
        { titulo: 'Siglo XX', contenido: 'Guerras mundiales y cambios geopolíticos.' }
      ]
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