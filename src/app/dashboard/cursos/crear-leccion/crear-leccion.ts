import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Lecciones } from '../../../services/lecciones';
import { CursosService } from '../../../services/cursos';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Modulo } from '../../../core/models/curso';

@Component({
  selector: 'app-crear-leccion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-leccion.html',
})
export class CrearLeccion implements OnInit {

  private fb = inject(FormBuilder);
  private leccionesService = inject(Lecciones);
  private cursosService = inject(CursosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  modulos: Modulo[] = [];
  cursoId!: number;
  moduloIdPreseleccionado!: number | null;

  leccionForm = this.fb.group({
    modulo: [null as number | null, Validators.required],
    titulo: ['', Validators.required],
    contenido: [''],
    orden: [1, Validators.required],
    recursos: this.fb.array([])
  });

  get recursos() {
    return this.leccionForm.get('recursos') as FormArray;
  }

  ngOnInit() {
    // cursoId obligatorio en la URL
    this.cursoId = Number(this.route.snapshot.paramMap.get('cursoId'));

    // módulo opcional en queryParams
    this.moduloIdPreseleccionado = Number(this.route.snapshot.queryParamMap.get('moduloId')) || null;

    if (!this.cursoId) {
      // fallback seguro
      this.router.navigate(['/dashboard/mis-cursos']);
      return;
    }

    this.cargarModulos(this.cursoId);
  }


  cargarModulos(cursoId: number) {
    this.cursosService.getCurso(cursoId).subscribe({
      next: curso => {
        this.modulos = curso.modulos || [];

        // Preseleccionar módulo si viene de EditarCurso
        if (this.moduloIdPreseleccionado) {
          const existe = this.modulos.find(m => m.id === this.moduloIdPreseleccionado);
          if (existe) {
            this.leccionForm.patchValue({ modulo: this.moduloIdPreseleccionado });
          }
        }
      },
      error: err => console.error('Error al cargar módulos', err)
    });
  }

  agregarRecurso() {
    this.recursos.push(this.fb.group({
      tipo: ['pdf', Validators.required],
      url_enlace: [''],
      archivo: [null],
      descripcion: [''],
      orden: [this.recursos.length + 1]
    }));
  }

  eliminarRecurso(index: number) {
    this.recursos.removeAt(index);
  }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    this.recursos.at(index).patchValue({ archivo: file });
  }

  submit() {
    console.log('SUBMIT EJECUTADO');
    if (this.leccionForm.invalid) {
      this.leccionForm.markAllAsTouched();
      return;
    }

    const value = this.leccionForm.value;

    const formData = new FormData();
    formData.append('modulo', String(value.modulo));
    formData.append('titulo', value.titulo!);
    formData.append('contenido', value.contenido ?? '');
    formData.append('orden', String(value.orden));

    this.recursos.controls.forEach((rec, i) => {
      const tipo = rec.value.tipo;
      formData.append(`recursos[${i}]tipo`, tipo);
      formData.append(`recursos[${i}]descripcion`, rec.value.descripcion ?? '');
      formData.append(`recursos[${i}]orden`, String(rec.value.orden));

    if (tipo === 'video' || tipo === 'enlace') {
          let url = rec.value.url_enlace || '';
          // Si es video, convertir link normal de YT a link de EMBED
          if (tipo === 'video' && url.includes('youtube.com/watch?v=')) {
            url = url.replace('watch?v=', 'embed/');
          } else if (tipo === 'video' && url.includes('youtu.be/')) {
            const id = url.split('/').pop();
            url = `https://www.youtube.com/embed/${id}`;
          }
          formData.append(`recursos[${i}]url_enlace`, url);
        } else if (rec.value.archivo) {
          // Para PDF o Archivos descargables
          formData.append(`recursos[${i}]archivo`, rec.value.archivo);
        }
      });

    this.leccionesService.crearLeccion(formData).subscribe({
      next: () => {
        // Volvemos al curso que se estaba editando
        this.router.navigate(['/dashboard/editar-curso', this.cursoId]);
      },
      error: err => console.error('Error al crear:',err)
    });
  }
}