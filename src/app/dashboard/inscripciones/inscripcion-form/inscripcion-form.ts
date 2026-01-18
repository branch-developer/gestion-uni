import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inscripciones } from '../../../services/inscripciones';
import { CursosService } from '../../../services/cursos';
import { Curso } from '../../../core/models/curso';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-inscripcion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './inscripcion-form.html',
})

export class InscripcionForm implements OnInit {

  private inscripcionesService = inject(Inscripciones);
  private cursosService = inject(CursosService);
  private auth = inject(AuthService);
  
  private route = inject(ActivatedRoute);
  public router = inject(Router);

  cursos: Curso[] = [];
  curso!: Curso;
  mensaje = '';
  cargando = true;

  ngOnInit(): void {
    const cursoId = Number(this.route.snapshot.paramMap.get('cursoId'));
    if (!cursoId) {
      this.mensaje = 'No se ha especificado el curso.';
      this.cargando = false;
      return;
    }

    this.cursosService.getCurso(cursoId).subscribe({
      next: (curso) => {
        this.curso = curso;
        this.cargando = false;
      },
      error: err => {
        this.mensaje = 'Error al cargar el curso';
        this.cargando = false;
      }
    });
  }


  irASubirComprobante() {
  // Validar que el curso esté cargado
  if (!this.curso) {
    this.mensaje = 'No se ha seleccionado un curso.';
    this.cargando = false;
    return;
  }

  const token = this.auth.getToken();
    if (!token) {
      this.mensaje = 'Debes iniciar sesión primero';
      this.cargando = false;
      return;
    }

  // Reiniciar mensaje de error y mostrar loading
  this.mensaje = '';
  this.cargando = true;

  // Crear la inscripción en el backend
  this.inscripcionesService.crear({ curso_id: this.curso.id }).subscribe({
    next: (inscripcion) => {
      console.log('Inscripción creada:', inscripcion);

      // Validar que el backend devolvió un ID
      if (!inscripcion?.id) {
        this.mensaje = 'No se pudo obtener el ID de la inscripción.';
        this.cargando = false;
        return;
      }

      // Navegar al formulario de subir comprobante usando el ID
      // Coincide con tu ruta: 'pagos/subir-comprobante/:id'
      this.router.navigate(
        ['/dashboard/pagos/subir-comprobante', inscripcion.id]
      ).then(navigated => {
        if (!navigated) {
          this.mensaje = 'No se pudo redirigir al formulario de pago.';
        }
        this.cargando = false;
      });
    },
    error: (err) => {
      this.cargando = false;

      if (err.status === 400) {
        this.mensaje =
          err.error?.detail ||
          err.error?.non_field_errors?.[0] ||
          'Ya estás inscrito en este curso';
      } else if (err.status === 401) {
        this.mensaje = 'Debes iniciar sesión primero';
      } else {
        this.mensaje = 'Error al iniciar la inscripción';
      }
      console.error('Error al crear inscripción:', err);
    }

  });
}

}