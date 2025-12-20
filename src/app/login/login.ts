import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  contrasena: string = '';
  rolSeleccionado: string = '';

  roles: string[] = ['alumno', 'profesor', 'adminC', 'adminP'];

  ngOnInit(): void {
    document.body.classList.add('login-background');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('login-background');
  }

  onSubmit(): void {
    // Validación mínima: si no hay rol, no hacemos nada
    if (!this.rolSeleccionado) {
      return;
    }
}
}
