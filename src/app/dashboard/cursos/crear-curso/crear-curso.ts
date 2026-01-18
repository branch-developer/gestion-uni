import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CursosService } from '../../../services/cursos';
import { Curso } from '../../../core/models/curso';
import { Profesor } from '../../../core/models/user';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users';

interface ModuloForm {
  titulo: string;
  orden: number;
}

@Component({
  selector: 'app-crear-curso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './crear-curso.html',
})

export class CrearCursoComponent implements OnInit {

  cursoForm!: FormGroup;
  estados = ['activo', 'inactivo', 'borrador'];
  profesores: Profesor[] = [];


  constructor(
  private fb: FormBuilder,
  private cursosService: CursosService,
  private usersService: UsersService
) {}

  ngOnInit(): void {
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

  this.cargarProfesores();
}

  cargarProfesores() {
    this.usersService.getProfesores().subscribe({
      next: (data) => {
        this.profesores = data; 
        console.log('Profesores cargados:', data);
      },
      error: (err) => {
        console.error('Error cargando profesores', err);
      }
    });
  }

  // Getter para acceder al FormArray
  get modulos(): FormArray {
    return this.cursoForm.get('modulos') as FormArray;
  }

  // Agregar un módulo
  agregarModulo(): void {
    const modulo = this.fb.group({
      titulo: ['', Validators.required],
      orden: [this.modulos.length + 1, Validators.required]
    });
    this.modulos.push(modulo);
  }

  // Eliminar módulo
  eliminarModulo(index: number): void {
    this.modulos.removeAt(index);
    // Reordenar automáticamente
    this.modulos.controls.forEach((ctrl, i) => ctrl.get('orden')?.setValue(i + 1));
  }

  // Enviar formulario
  guardarCurso(): void {
  if (this.cursoForm.invalid) {
    this.cursoForm.markAllAsTouched();
    return;
  }

  const modulos: ModuloForm[] = this.modulos.value as ModuloForm[];

    const curso = {
    ...this.cursoForm.value,
    modulos: modulos.map(m => ({
      titulo: m.titulo,
      orden: m.orden
    }))
  };

  console.log('Curso a enviar:', curso);

  this.cursosService.crearCurso(curso).subscribe({
    next: () => {
      alert('Curso creado exitosamente');
      this.cursoForm.reset({ estado: 'borrador', precio: 0, modulos: [] });
      this.modulos.clear();
    },
    error: (err) => {
      console.error('Error completo:', err.error);
    }
  });
}
}
