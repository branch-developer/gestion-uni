import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluacion.html',
  styleUrls: ['./evaluacion.css']
})
export class EvaluacionComponent {
  constructor(private router: Router) {}

  mostrarResultado = false;
  mensajeFinal: string | null = null;
  resultado: string = '';
  puntaje: number = 0;

  preguntas = [
    {
      texto: '¿Qué es una Promise en JavaScript?',
      opciones: [
        'Una función normal',
        'Un objeto que representa un valor que puede estar disponible ahora, en el futuro o nunca',
        'Un bucle especial',
        'Un tipo de variable'
      ],
      correcta: 1,
      respuesta: null
    },
    {
      texto: '¿Para qué sirve async/await?',
      opciones: [
        'Para declarar variables',
        'Para crear estilos CSS',
        'Para trabajar con promesas de forma más sencilla',
        'Para crear bucles while'
      ],
      correcta: 2,
      respuesta: null
    },
    {
      texto: '¿Qué es un módulo en JavaScript?',
      opciones: [
        'Una imagen',
        'Un archivo que exporta código reutilizable',
        'Un tipo de función especial',
        'Una base de datos'
      ],
      correcta: 1,
      respuesta: null
    }
  ];

  enviar() {
    let correctas = 0;

    this.preguntas.forEach(p => {
      if (p.respuesta === p.correcta) {
        correctas++;
      }
    });

    const porcentaje = Math.round((correctas / this.preguntas.length) * 100);
    this.puntaje = porcentaje;

    if (porcentaje >= 60) {
      this.resultado = '✅ Aprobado con ' + porcentaje + '%';
    } else {
      this.resultado = '❌ Reprobado con ' + porcentaje + '%';
    }

    // Aquí aparece el modal
    this.mostrarResultado = true;
  }

pasar() {
  this.mensajeFinal = `¡Felicidades!
Has completado el curso con Academia Rodriguez.
Puedes retirar tu certificado en la sede.
¡Búscanos como @rodriguez.academiaintegral y síguenos en Instagram!`;
}

reprobar() {
  this.mensajeFinal = ` Oportunidad Adicional
Tienes dos oportunidades.`;
}

}
