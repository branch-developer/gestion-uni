import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Evaluaciones } from '../../../services/evaluaciones';
import { CursosService } from '../../../services/cursos';
import { Leccion } from '../../../core/models/leccion';

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
  aprobado: boolean = false;
  puntajeFinal: number = 0;
  totalPosible: number = 0;
  leccion!: Leccion;

  constructor(
    private route: ActivatedRoute,
    private evaluacionesService: Evaluaciones,
    private cursosService: CursosService
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

    // Mapear al formato que espera el nuevo backend
    const payload = {
        evaluacion: this.evaluacion.id,
        respuestas: this.evaluacion.preguntas.map((p: any, index: number) => {
            // Buscamos el objeto respuesta cuyo texto coincide con lo seleccionado
            const rSeleccionada = p.respuestas.find((r: any) => r.texto === this.respuestasUsuario[index]);
            return {
                pregunta: p.id,
                respuesta: rSeleccionada.id
            };
        })
    };

    this.evaluacionesService.responderEvaluacion(payload).subscribe({
        next: (res) => {
            // Usamos el operador !! o aseguramos que aprobado exista
            this.aprobado = !!res.aprobado; 
            
            if (this.aprobado) {
                // Notifica al BehaviorSubject del servicio de cursos para refrescar datos
                this.cursosService.actualizarCursosAlumno(); 
            }

            // El backend nos devuelve el porcentaje (aseguramos que sea número)
            this.puntajeFinal = res.porcentaje ?? 0;
            this.enviado = true;
            
            // Scroll al inicio para ver el mensaje de éxito/resultado
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (err) => {
            console.error('Error al guardar evaluación:', err);
            alert('Hubo un problema al enviar tus respuestas. Por favor, intenta de nuevo.');
        }
    });
}

}