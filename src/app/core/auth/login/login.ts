import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './login.html'
})
export class LoginComponent {
  correo = '';
  password = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    localStorage.clear();
    sessionStorage.clear();

    this.authService.login(this.correo, this.password).subscribe({
      next: (res) => {
        console.log('¡Respuesta recibida!', res);

        if (!res.usuario?.rol) {
          alert('El usuario no tiene rol asignado.');
          return;
        }

        // Normalizamos el rol a minúscula
        const rol = res.usuario.rol.toLowerCase();

        // Redirigir según rol
        if (rol === 'estudiante') {
          this.router.navigate(['/dashboard/perfil-alumno']);
        } else if (rol === 'profesor') {
          this.router.navigate(['/dashboard/perfil-profesor']);
        } else if (rol === 'adminc') {
          this.router.navigate(['/dashboard/perfil-admin-c']);
        } else if (rol === 'adminp') {
          this.router.navigate(['/dashboard/perfil-admin-p']);
        } else {
          // fallback
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
