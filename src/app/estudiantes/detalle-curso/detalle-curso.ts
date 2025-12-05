import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-curso.html',
  styleUrls: ['./detalle-curso.css']
})
export class DetalleCursoComponent {

  curso = {
    titulo: 'Curso de JavaScript Avanzado',
    paginas: [
      {
        titulo: 'Página 1: Introducción a las Promesas',
        contenido:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.'
      },
      {
        titulo: 'Página 2: Async/Await',
        contenido:
          'Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie.'
      },
      {
        titulo: 'Página 3: Módulos en JavaScript',
        contenido:
          'Enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae.'
      }
    ]
  };

}
