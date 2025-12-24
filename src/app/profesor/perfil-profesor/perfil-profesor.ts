import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-profesor.html',
  
})
export class PerfilProfesorComponent {

  profesor = {
    nombre: 'Nombre del Profesor',
    especialidad: 'Desarrollo Web y Bases de Datos'
  };

  foto: string = 'https://via.placeholder.com/150';

  cursos = [
    { nombre: 'Curso de JavaScript Avanzado' },
    { nombre: 'Curso de Diseño de Bases de Datos' }
  ];

  estudiantes = [
    { correo: 'juan.perez@example.com', curso: 'Curso de JavaScript Avanzado', asistencia: true, estado: 'Aprobado' },
    { correo: 'ana.gomez@example.com', curso: 'Curso de JavaScript Avanzado', asistencia: false, estado: 'Viendo Curso' },
    { correo: 'carlos.ruiz@example.com', curso: 'Curso de Diseño de Bases de Datos', asistencia: true, estado: 'No Aprobado' }
  ];

  // --- CURSOS ---
  crearCurso() {
    const nombre = prompt('Introduce el nombre del curso:');
    if (nombre) this.cursos.push({ nombre });
  }

  editarCurso(index: number) {
    const nuevoNombre = prompt('Nuevo nombre del curso:', this.cursos[index].nombre);
    if (nuevoNombre) this.cursos[index].nombre = nuevoNombre;
  }

  eliminarCurso(index: number) {
    if (confirm(`¿Deseas eliminar el curso "${this.cursos[index].nombre}"?`)) {
      this.cursos.splice(index, 1);
    }
  }

  contarEstudiantes(nombreCurso: string) {
    return this.estudiantes.filter(e => e.curso === nombreCurso).length;
  }

  // --- ESTUDIANTES ---
  autorizarCertificacion(correo: string) {
    alert(`Certificación autorizada para ${correo}`);
  }

  // --- FOTO ---
  cambiarFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.foto = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

  cerrarSesion() {
    if (confirm('¿Deseas cerrar sesión?')) {
      try { localStorage.clear(); sessionStorage.clear(); } catch (e) {}
      window.location.href = '/';
    }
  }
}
