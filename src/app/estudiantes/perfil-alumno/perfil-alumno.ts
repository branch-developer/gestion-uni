import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './perfil-alumno.html',
})
export class PerfilAlumnoComponent {
  nombreAlumno = 'Juan Pérez';
  correo = 'juan@email.com';
  fechaInscripcion = '2024-02-10';
  descripcion = 'Estudiante de la universidad';
  gustos = 'Programación, música';
}

