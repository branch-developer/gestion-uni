import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

/** * MODELOS DE DATOS
 */
interface Pago {
  id: string;
  alumno: string;
  curso: string;
  monto: number;
  fecha: string;
  metodo: string;
  referencia: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
}

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  progreso?: number;
  paginas?: { titulo: string, contenido: string }[];
}

type Vista = 'admin' | 'perfil' | 'mis-cursos' | 'cursos-disponibles' | 'detalle-curso' | 'evaluacion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
