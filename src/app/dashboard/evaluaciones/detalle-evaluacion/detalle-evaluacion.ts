import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Evaluaciones } from '../../../services/evaluaciones';

@Component({
  selector: 'app-detalle-evaluacion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './detalle-evaluacion.html',
})
export class DetalleEvaluacion implements OnInit {
  evaluacion: any;
  respuestasUsuario: any[] = []; // Guarda el texto o ID de la opción seleccionada
  enviado: boolean = false;
  puntajeFinal: number = 0;
  totalPosible: number = 0;

  constructor(
    private route: ActivatedRoute,
    private evaluacionesService: Evaluaciones
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarEvaluacion(id);
  }

  cargarEvaluacion(id: number) {
    this.evaluacionesService.getEvaluacion(id).subscribe({
      next: (res) => {
        this.evaluacion = res;
        // Inicializamos el array para capturar respuestas
        this.respuestasUsuario = new Array(this.evaluacion.preguntas.length).fill(null);
        // Calculamos el puntaje máximo posible de esta evaluación
        this.totalPosible = this.evaluacion.preguntas.reduce((acc: number, p: any) => acc + (p.puntaje || 0), 0);
      },
      error: (err) => console.error('Error cargando evaluación', err)
    });
  }

  enviarEvaluacion() {
    if (this.respuestasUsuario.includes(null)) {
      alert('Por favor, responde todas las preguntas antes de finalizar.');
      return;
    }

    let puntosGanados = 0;

    this.evaluacion.preguntas.forEach((pregunta: any, index: number) => {
      const respuestaSeleccionada = this.respuestasUsuario[index];
      // Buscamos en el array de respuestas de la pregunta cuál es la correcta
      const opcionCorrecta = pregunta.respuestas.find((r: any) => r.es_correcta === true || r.es_correcta === 1);

      if (opcionCorrecta && respuestaSeleccionada === opcionCorrecta.texto) {
        puntosGanados += pregunta.puntaje;
      }
    });

    this.puntajeFinal = (puntosGanados / this.totalPosible) * 100;
    this.enviado = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get aprobado(): boolean {
    return this.puntajeFinal >= 70; // Umbral de aprobación
  }
}