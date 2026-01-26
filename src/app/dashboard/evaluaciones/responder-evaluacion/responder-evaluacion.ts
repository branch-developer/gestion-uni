import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Evaluaciones } from '../../../services/evaluaciones';
import { Router, ActivatedRoute } from '@angular/router';

interface RespuestaForm {
  id: FormControl<number>;
  texto: FormControl<string>;
  seleccionado: FormControl<boolean>;
}

interface PreguntaForm {
  id: FormControl<number>;
  respuestas: FormArray<FormGroup<RespuestaForm>>;
}

@Component({
  selector: 'app-responder-evaluacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './responder-evaluacion.html'
})
export class ResponderEvaluacion implements OnInit {
  form: FormGroup<{ preguntas: FormArray<FormGroup<PreguntaForm>> }>;
  evaluacionId: number;
  cargando = true;

  constructor(
    private fb: FormBuilder,
    private service: Evaluaciones,
    private route: ActivatedRoute,
    private router: Router    
  ) {
    // Inicialización correcta tipada
    this.form = this.fb.group({
      preguntas: this.fb.array<FormGroup<PreguntaForm>>([])
    });
    this.evaluacionId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.service.obtenerEvaluacion(this.evaluacionId).subscribe({
      next: evaluacion => this.inicializarFormulario(evaluacion),
      error: err => console.error(err)
    });
  }

  inicializarFormulario(evaluacion: any) {
    const preguntasArray = this.form.get('preguntas') as FormArray<FormGroup<PreguntaForm>>;

    evaluacion.preguntas.forEach((pregunta: any) => {
    const respuestasArray = new FormArray<FormGroup<RespuestaForm>>([]);

    pregunta.respuestas.forEach((resp: any) => {
      respuestasArray.push(
        new FormGroup<RespuestaForm>({
          id: new FormControl<number>(resp.id, { nonNullable: true }),
          texto: new FormControl<string>(resp.texto, { nonNullable: true }),
          seleccionado: new FormControl<boolean>(false, { nonNullable: true }) // ✅ aquí
        })
      );
    });

    preguntasArray.push(
      new FormGroup<PreguntaForm>({
        id: new FormControl<number>(pregunta.id, { nonNullable: true }),
        respuestas: respuestasArray
      })
    );

    });
    this.cargando = false;
  }

  get preguntas(): FormArray<FormGroup<PreguntaForm>> {
    return this.form.get('preguntas') as FormArray<FormGroup<PreguntaForm>>;
  }

  respuestas(preguntaIndex: number): FormArray<FormGroup<RespuestaForm>> {
    return this.preguntas.at(preguntaIndex).get('respuestas') as FormArray<FormGroup<RespuestaForm>>;
  }

  submit(): void {
    const payload = {
      evaluacion: this.evaluacionId,
      respuestas: [] as { pregunta: number; respuesta: number }[]
    };

    this.preguntas.controls.forEach(preguntaGroup => {
      const preguntaId = preguntaGroup.get('id')!.value;
      const respuestasArray = preguntaGroup.get('respuestas') as FormArray<FormGroup<RespuestaForm>>;

      respuestasArray.controls.forEach(r => {
          if (r.get('seleccionado')!.value) {
            payload.respuestas.push({
              pregunta: preguntaId,
              respuesta: r.get('id')!.value // Enviamos el ID numérico
            });
          }
        });
      });

      if (payload.respuestas.length < this.preguntas.length) {
        alert('Por favor responde todas las preguntas');
        return;
      }

      this.service.responderEvaluacion(payload).subscribe({
          next: res => {
            console.log('Evaluación procesada por el servidor:', res);
            // Redirigir al historial o mostrar resultado
            this.router.navigate(['/dashboard/calificaciones']);
          },
          error: err => console.error('Error al enviar:', err)
        });
      }
}
