import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  progreso?: number;
  paginas?: { titulo: string, contenido: string }[];
}

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil-alumno.html',
  styles: [`
    :host { display: block; }
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-in { animation: fade-in 0.4s cubic-bezier(0, 0, 0.2, 1); }
  `]
})
export class PerfilAlumnoComponent {
  // DATOS DEL ALUMNO
  nombreAlumno = 'Andrés Rodríguez';
  correo = 'andres.rod@academia.edu';
  fechaInscripcion = '15 de Mayo, 2025';
  descripcion = 'Estudiante de Ingeniería apasionado por la tecnología.';
  gustos = 'Programación, Ajedrez, Matemáticas.';

  // LÓGICA DE CURSOS
  cursosInscritos: Curso[] = [
    {
      id: 1,
      titulo: 'Matemática Avanzada',
      descripcion: 'Cálculo integral y series de Fourier.',
      progreso: 60,
      paginas: [
        { titulo: 'Derivadas Parciales', contenido: 'Una derivada parcial de una función de varias variables es su derivada con respecto a una de esas variables...' },
        { titulo: 'Integrales de Línea', contenido: 'Una integral de línea es una integral donde la función a integrar es evaluada a lo largo de una curva...' }
      ]
    }
  ];

  catalogo: Curso[] = [
    { id: 2, titulo: 'Introducción a la Programación', descripcion: 'Lógica algorítmica y fundamentos de JS.' },
    { id: 3, titulo: 'Historia Universal', descripcion: 'Desde la revolución industrial hasta hoy.' }
  ];

  // Cerrar sesión
  cerrarSesion() {
    console.log('Cerrando sesión...');
  }
}
