import { Component, OnInit } from '@angular/core';
import { CursoService, Curso } from '../../services/cursos';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil-alumno.html'
})
export class PerfilAlumnoComponent implements OnInit {
  nombreAlumno = '';
  telefono = '';
  correo = '';
  cedula = '';
  fechaRegistro = '';
  cursosInscritos: Curso[] = [];

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursoService.getAlumno().subscribe({
      next: (alumno: any) => {
        this.nombreAlumno = alumno.nombre_completo;
        this.telefono = alumno.telefono;
        this.correo = alumno.correo;
        this.cedula = alumno.cedula;
        this.fechaRegistro = alumno.fecha_registro;
      },
      error: err => console.error('Error al traer info del alumno', err)
    });
  }

  cerrarSesion() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    window.location.href = '/login';
  }
}
