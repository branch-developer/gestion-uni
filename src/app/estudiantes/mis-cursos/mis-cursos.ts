import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [CommonModule],   // <--- ESTO ARREGLA EL *ngFor
  templateUrl: './mis-cursos.html',
  styleUrls: ['./mis-cursos.css']
})
export class MisCursosComponent {

  cursos = [
    { nombre: 'Matemática Avanzada', progreso: 60 },
    { nombre: 'Introducción a la Programación', progreso: 40 },
    { nombre: 'Historia Universal', progreso: 85 }
  ];

}
