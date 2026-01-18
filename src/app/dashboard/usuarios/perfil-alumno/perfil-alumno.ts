// src/app/dashboard/usuarios/perfil-alumno/perfil-alumno.ts
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../../services/cursos';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';
import { Curso } from '../../../core/models/curso';
import { Usuario } from '../../../core/models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './perfil-alumno.html'
})
export class PerfilAlumnoComponent implements OnInit {
  // Datos del formulario
  usuario!: Usuario; // definite assignment assertion
  cursosInscritos: Curso[] = [];
  editandoPerfil = false;
 
  constructor(
    private auth: AuthService,
    private cursosService: CursosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener usuario logueado
    const usuarioLogueado = this.auth.getUsuario() as Usuario | null;

    if (!usuarioLogueado) {
      console.error('No hay usuario logueado');
      this.router.navigate(['/login']);
      return;
    }

    // Inicializamos el objeto usuario
    this.usuario = { ...usuarioLogueado };

    // Traer cursos inscritos
    if (usuarioLogueado.id_usuario) {
      this.cursosService.getAlumno(String(usuarioLogueado.id_usuario)).subscribe({      
          next: alumno => {
            this.cursosInscritos = alumno.cursos || [];
          },
        error: err => console.error('Error al traer info del alumno', err)
      });
    }
  }

  toggleEditarPerfil() {
    this.editandoPerfil = !this.editandoPerfil;
  }
  
  // Guardar cambios en el perfil
guardarCambios(): void {
  if (!this.usuario) {
    alert('Usuario no inicializado');
    return;
  }

  this.auth.updateUsuario(this.usuario.id_usuario, this.usuario)
    .subscribe({
      next: (res) => {
        localStorage.setItem('usuario', JSON.stringify(res));
        this.usuario = res as Usuario;
        alert('Perfil actualizado correctamente');
        this.editandoPerfil = false;
      },
      error: (err) => {
        console.error('Error al actualizar el perfil', err);
        alert('Error al actualizar el perfil');
      }
    });
}

  // Cerrar sesión
  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // Para trackBy en ngFor de cursos inscritos
  trackById(index: number, curso: Curso): number {
    return curso.id;
  }

  // Redirecciones rápidas
  irACurso(cursoId: number): void {
    this.router.navigate(['/dashboard/detalle-curso', String(cursoId)]);
  }

  subirComprobante(cursoId: number): void {
    this.router.navigate(['/dashboard/pagos/subir-comprobante', String(cursoId)]);
  }
}
