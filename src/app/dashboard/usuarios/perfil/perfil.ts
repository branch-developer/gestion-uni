import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
})
export class PerfilComponent implements OnInit {

  tipoUsuario: 'alumno' | 'profesor' | 'admin-c' | 'admin-p' = 'alumno'; // valor por defecto
  usuario: any; // datos del usuario actual

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario(); // obtenemos info del login
    this.tipoUsuario = this.usuario.tipo; // por ejemplo: 'profesor'
  }

  cerrarSesion() {
    this.authService.logout();
  }

}
