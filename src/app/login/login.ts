import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  contrasena: string = '';
  rolSeleccionado: string = '';
  mostrarContrasena: boolean = false;

  roles: string[] = ['alumno', 'profesor', 'adminC', 'adminP'];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Usamos clases de utilidad de Tailwind directamente (ej: fondo gris)
      document.body.classList.add('bg-gray-100');
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('bg-gray-100');
    }
  }

  seleccionarRol(rol: string): void {
    this.rolSeleccionado = rol;
  }

  togglePasswordVisibility(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  onSubmit(): void {
    // Validación mínima: si no hay rol, no hacemos nada
    if (!this.rolSeleccionado) {
      alert('Por favor selecciona un rol');
      return;
    }

    // Simular autenticación exitosa (reemplaza con tu servicio real)
    localStorage.setItem('userRole', this.rolSeleccionado);
    localStorage.setItem('userEmail', this.email);

    // Redirigir según rol
    switch (this.rolSeleccionado) {
      case 'alumno':
        this.router.navigate(['/estudiantes/perfil-alumno']);
        break;
      case 'profesor':
        this.router.navigate(['/profesor/perfil-profesor']);
        break;
      case 'adminC':
        this.router.navigate(['/admin-c']);
        break;
      case 'adminP':
        this.router.navigate(['/admin-p']);
        break;
      default:
        alert('Rol no reconocido');
    }
  }
}
