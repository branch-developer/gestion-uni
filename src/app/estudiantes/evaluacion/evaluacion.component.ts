import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluacion.html',
  styles: [`
    :host { display: block; }
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-in { animation: fade-in 0.4s cubic-bezier(0, 0, 0.2, 1); }
    input[type="radio"]:checked + span { color: #2563eb; }
  `]
})
export class EvaluacionComponent {
  // LÓGICA DE EVALUACIÓN
  preguntas = [
    { texto: '¿Cuánto es 2 + 2?', opciones: ['3', '4', '5'], correcta: '4' },
    { texto: '¿Cuál es la capital de Francia?', opciones: ['Roma', 'París', 'Madrid'], correcta: 'París' },
    { texto: '¿Qué lenguaje usa Angular?', opciones: ['Python', 'Java', 'TypeScript'], correcta: 'TypeScript' }
  ];

  respuestas: string[] = new Array(this.preguntas.length).fill('');
  evaluacionEnviada = signal(false);
  porcentaje = signal(0);
  aprobado = computed(() => this.porcentaje() >= 70);

  constructor(private router: Router) {}

  // MÉTODOS
  enviarEvaluacion() {
    let aciertos = 0;
    this.respuestas.forEach((r, i) => {
      if (r === this.preguntas[i].correcta) aciertos++;
    });
    this.porcentaje.set(Math.round((aciertos / this.preguntas.length) * 100));
    this.evaluacionEnviada.set(true);
  }

  reintentar() {
    this.respuestas = new Array(this.preguntas.length).fill('');
    this.evaluacionEnviada.set(false);
  }

  volverPerfil() {
    // Logic to finalize course, perhaps update progress
    this.router.navigate(['/estudiantes/perfil-alumno']);
    this.evaluacionEnviada.set(false);
  }
}
