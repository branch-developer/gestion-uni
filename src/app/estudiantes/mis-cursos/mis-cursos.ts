import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [CommonModule, RouterLink],   // <--- ESTO ARREGLA EL *ngFor
  templateUrl: './mis-cursos.html',
 
})
export class MisCursosComponent {

  cursos = [
    { nombre: 'Matemática Avanzada', progreso: 60 },
    { nombre: 'Introducción a la Programación', progreso: 40 },
    { nombre: 'Historia Universal', progreso: 85 }
  ];

}
