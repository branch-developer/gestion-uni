import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-evaluaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './evaluacion.html',
  styleUrls: ['./evaluacion.css']
})
export class EvaluacionesComponent {

  // Respuestas del usuario (3 preguntas)
  respuestas: string[] = ['', '', ''];

  evaluacionEnviada = false;
  aprobado = false;
  porcentaje = 0;

  // Respuestas correctas
  respuestasCorrectas: string[] = ['B', 'B', 'C'];

  enviarEvaluacion() {
    let correctas = 0;

    this.respuestas.forEach((respuesta, index) => {
      if (respuesta === this.respuestasCorrectas[index]) {
        correctas++;
      }
    });

    this.porcentaje = Math.round(
      (correctas / this.respuestasCorrectas.length) * 100
    );

    this.aprobado = this.porcentaje >= 70;
    this.evaluacionEnviada = true;
  }

  reintentar() {
    this.respuestas = ['', '', ''];
    this.evaluacionEnviada = false;
    this.aprobado = false;
    this.porcentaje = 0;
  }
}
