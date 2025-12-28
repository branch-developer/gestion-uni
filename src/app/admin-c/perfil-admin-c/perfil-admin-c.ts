import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-admin-c',
  standalone: true,
  templateUrl: './perfil-admin-c.html',
})
export class PerfilAdminCComponent {

  constructor(private router: Router) {}

  logout() {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}
    this.router.navigate(['/login']);
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

    // 🔥 IMPORTANTE: ahora las clases son Tailwind
    el.className = `
      font-bold px-2 py-1 rounded-md text-white w-20 text-center
      ${activo ? 'bg-green-600' : 'bg-red-600'}
    `;
  }
}
