import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-admin-c',
  standalone: true,
  templateUrl: './perfil-admin-c.html',
  styleUrls: ['./perfil-admin-c.css']
})
export class PerfilAdminCComponent {

  logout() {
    console.log('Cerrar sesión');
  }

  verProgreso(nombre: string) {
    alert(`Mostrando progreso de ${nombre}`);
  }

  enviarRecordatorio(nombre: string) {
    alert(`Enviando recordatorio a ${nombre}`);
  }

  eliminarCurso(nombre: string) {
    const curso = prompt(`¿Qué curso deseas eliminar para ${nombre}?`);
    if (curso) {
      alert(`Curso ${curso} eliminado`);
    }
  }

  editarUsuario(usuario: string) {
    alert(`Editando usuario ${usuario}`);
  }

  activarUsuario(usuario: string, activo: boolean, id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    el.textContent = activo ? 'Activo' : 'Inactivo';
    el.className = `status-text ${activo ? 'activo' : 'inactivo'}`;
  }
}
