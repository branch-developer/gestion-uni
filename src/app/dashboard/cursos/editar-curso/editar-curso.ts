import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../../services/cursos';
import { Curso, Modulo } from '../../../core/models/curso';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.html',
  imports: [CommonModule, ReactiveFormsModule ],
  standalone: true,
})
export class EditarCursoComponent implements OnInit {

  cursoForm!: FormGroup;
  estados = ['activo', 'inactivo', 'borrador'];
  profesores = [
    // Puedes traer desde un servicio real
    { id: 1, nombre: 'Profesor 1' },
    { id: 2, nombre: 'Profesor 2' }
  ];
  cursoId!: number;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  cursoEvaluaciones: any[] = [];

  ngOnInit(): void {
    this.cursoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cursoForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion_breve: [''],
      descripcion: [''],
      imagen: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      estado: ['borrador', Validators.required],
      profesor: [null, Validators.required],
      modulos: this.fb.array([])
    });

    this.cargarCurso();
  }

  // FormArray de módulos
  get modulos(): FormArray<FormGroup> {
    return this.cursoForm.get('modulos') as FormArray<FormGroup>;
  }

  // Crear un FormGroup de módulo
  private crearModulo(modulo?: Modulo): FormGroup {
    return this.fb.group({
      id: [modulo?.id || null],
      titulo: [modulo?.titulo || '', Validators.required],
      orden: [modulo?.orden || this.modulos.length + 1, Validators.required],

      // FormArray de lecciones
      lecciones: this.fb.array(
        modulo?.lecciones?.map(l => this.fb.group({
          id: [l.id],
          titulo: [l.titulo],
          orden: [l.orden]
        })) || []
      )
    });
  }


  // Agregar módulo vacío
  agregarModulo(): void {
    this.modulos.push(this.crearModulo());
  }

  agregarLeccion(modulo: FormGroup): void {
    const moduloId = modulo.get('id')?.value;

    this.router.navigate(['/dashboard/curso/crear-leccion', this.cursoId], {
      queryParams: { moduloId }
    });
  }

  // Navegar a crear evaluación para el curso
  agregarEvaluacion(): void {
    this.router.navigate(['/dashboard/evaluaciones/crear'], {
      queryParams: { cursoId: this.cursoId }
    });
  }

  verEvaluacion(evaluacionId: number): void {
    this.router.navigate(
      ['/dashboard/evaluaciones/detalle', evaluacionId]
    );
  }

  // Devuelve el FormArray de lecciones de un módulo
  getLecciones(modulo: FormGroup): FormArray {
    return modulo.get('lecciones') as FormArray;
  }


  verLeccion(leccionId: number | null) {
    if (!leccionId) {
      alert('Esta lección todavía no tiene ID');
      return;
    }
    this.router.navigate(['/dashboard/curso/detalle-leccion', leccionId]);
  }

  // Eliminar módulo
  eliminarModulo(index: number): void {
    this.modulos.removeAt(index);
    // Reordenar automáticamente
    this.modulos.controls.forEach((ctrl, i) => ctrl.get('orden')?.setValue(i + 1));
  }

  // Cargar curso desde backend
  cargarCurso(): void {
    this.cursosService.getCurso(this.cursoId).subscribe({
      next: (curso: Curso) => {
        this.cursoForm.patchValue({
          titulo: curso.titulo,
          descripcion_breve: curso.descripcion_breve,
          descripcion: curso.descripcion,
          imagen: curso.imagen,
          precio: curso.precio,
          estado: curso.estado,
          profesor: curso.profesor
        });

        this.cursoEvaluaciones = curso.evaluaciones || [];
        // Limpiar modulos existentes
        this.modulos.clear();

        // Agregar módulos existentes
        if (curso.modulos) {
          curso.modulos.forEach(mod => this.modulos.push(this.crearModulo(mod)));
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error al cargar el curso');
        this.router.navigate(['/dashboard/cursos']);
      }
    });
  }

  // Guardar cambios
  guardarCurso(): void {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
      return;
    }

    const cursoActualizado: Curso = this.cursoForm.value;

    this.cursosService.actualizarCurso(this.cursoId, cursoActualizado).subscribe({
      next: (res) => {
        alert('Curso actualizado exitosamente');
        this.router.navigate(['/dashboard/mis-cursos']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar el curso');
      }
    });
  }
}
