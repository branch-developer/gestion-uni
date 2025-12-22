import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  contrasena: string = '';
  rolSeleccionado: string = '';

  roles: string[] = ['alumno', 'profesor', 'adminC', 'adminP'];

  constructor(private router: Router) {} 

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.add('login-background');
    }
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('login-background');
    }
  }

  seleccionarRol(rol: string): void {
    this.rolSeleccionado = rol;
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
