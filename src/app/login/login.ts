import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser, CommonModule } from '@angular/common';

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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

  selectRole(rol: string): void {
    this.rolSeleccionado = rol;
  }

  togglePasswordVisibility(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  onSubmit(): void {
    // Validación mínima: si no hay rol, no hacemos nada
    if (!this.rolSeleccionado) {
      return;
    }
}
}
