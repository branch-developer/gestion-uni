import { Component } from '@angular/core';
import { Evaluaciones } from '../../../services/evaluaciones';
import { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-evaluacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-evaluacion.html',
})
export class CrearEvaluacion {
  form: FormGroup;
  submitting = false;  // para deshabilitar el botón mientras se envía
  successMessage = '';
  errorMessage = '';

  private cursoId: number;

  constructor(
    private fb: FormBuilder,
    private service: Evaluaciones,
    public router: Router,
    private route: ActivatedRoute
  ) {
    // Tomamos el cursoId de la URL si existe
    this.cursoId = Number(this.route.snapshot.queryParamMap.get('cursoId'));
    const moduloId = Number(this.route.snapshot.queryParamMap.get('moduloId'));

    this.form = this.fb.group({
      curso: [this.cursoId || null, Validators.required],
      titulo: ['', Validators.required],
      descripcion: [''],
      estado: ['activa', Validators.required],
      preguntas: this.fb.array([this.crearPregunta()]),
    });
  }

  // Getter para preguntas
  get preguntas(): FormArray {
    return this.form.get('preguntas') as FormArray;
  }

  respuestas(preguntaIndex: number): FormArray {
    return this.preguntas.at(preguntaIndex).get('respuestas') as FormArray;
  }

  // Crear pregunta
  private crearPregunta(): FormGroup {
    return this.fb.group({
      texto: ['', Validators.required],
      tipo: ['seleccion', Validators.required],
      puntaje: [1, Validators.required],
      respuestas: this.fb.array([this.crearRespuesta()]),
    });
  }

  // Crear respuesta
  private crearRespuesta(): FormGroup {
    return this.fb.group({
      texto: ['', Validators.required],
      es_correcta: [false],
    });
  }

  // Agregar pregunta
  agregarPregunta(): void {
    this.preguntas.push(this.crearPregunta());
  }

  // Agregar respuesta
  agregarRespuesta(preguntaIndex: number): void {
    this.respuestas(preguntaIndex).push(this.crearRespuesta());
  }

  // Eliminar pregunta
  eliminarPregunta(index: number): void {
    this.preguntas.removeAt(index);
  }

  // Eliminar respuesta de una pregunta
  eliminarRespuesta(preguntaIndex: number, respuestaIndex: number): void {
    this.respuestas(preguntaIndex).removeAt(respuestaIndex);
  }

  onTipoChange(index: number) {
    const pregunta = this.preguntas.at(index);
    const tipo = pregunta.get('tipo')?.value;
    const respuestas = pregunta.get('respuestas') as FormArray;

    if (tipo === 'verdadero_falso') {
      // Limpiar y dejar solo 2 opciones
      while (respuestas.length) { respuestas.removeAt(0); }
      respuestas.push(this.fb.group({ texto: ['Verdadero'], es_correcta: [false] }));
      respuestas.push(this.fb.group({ texto: ['Falso'], es_correcta: [false] }));
    }
  }

  // Asegura que solo haya una correcta SI es Verdadero/Falso
  validarUnicaCorrecta(preguntaIndex: number, respuestaIndex: number) {
    const pregunta = this.preguntas.at(preguntaIndex);
    const tipo = pregunta.get('tipo')?.value;
    const respuestasArray = this.respuestas(preguntaIndex);

    // SOLO aplicamos la restricción si es Verdadero/Falso
    if (tipo === 'verdadero_falso') {
      respuestasArray.controls.forEach((control, i) => {
        if (i !== respuestaIndex) {
          control.get('es_correcta')?.setValue(false);
        }
      });
    }
  }

  // Método para calcular el puntaje total
  get puntajeTotal(): number {
    return this.preguntas.controls
      .map(p => p.get('puntaje')?.value || 0)
      .reduce((acc, curr) => acc + curr, 0);
  }

  // Enviar formulario
  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    this.submitting = true;
    const dataParaEnviar = { ...this.form.value };
    
    this.service.crearEvaluacion(dataParaEnviar).subscribe({
      next: (res) => {
        this.successMessage = 'Evaluación creada exitosamente';
        setTimeout(() => this.router.navigate([`/dashboard/editar-curso/${this.cursoId}`]), 1500);
      },
      error: (err) => {
        console.error('Error del servidor:', err.error); // Mira esto en la consola F12
        this.errorMessage = 'Error: ' + (err.error?.detail || 'No se pudo crear la evaluación');
        this.submitting = false;
      }
    });
  }
}
