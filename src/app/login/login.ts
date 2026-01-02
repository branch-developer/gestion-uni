import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Necesario para el formulario
import { AuthService } from '../services/auth'; // Ajusta la ruta si es necesario
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // <-- Importante para usar ngModel
  templateUrl: './login.html'
})
export class LoginComponent {
  // Datos del formulario
  correo = '';
  password = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.authService.login(this.correo, this.password).subscribe({
      next: (res) => {
        console.log('¡Respuesta recibida!', res);
        
        // 1. Guardar el token (ajusta 'res.token' según lo que viste en consola)
        localStorage.setItem('token', res.token);
        
        // 2. Sacar el rol del objeto usuario
        const rol = res.usuario.rol; 
        console.log('El rol es:', rol);

        // 3. ¡REDIRECCIONAR!
        if (rol === 'estudiante') {
          this.router.navigate(['/estudiantes/perfil-alumno']);
        } else if (rol === 'profesor') {
          this.router.navigate(['/profesor/perfil-profesor']);
        } else {
          this.router.navigate(['/admin-c']);
        }
      },
      error: (err) => {
        alert('Error en el login');
      }
    });
  }
}