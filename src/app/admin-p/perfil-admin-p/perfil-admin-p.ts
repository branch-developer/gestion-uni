import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pago {
  alumno: string;
  curso: string;
  banco: string;
  referencia: string;
  cedula: string;
}

@Component({
  selector: 'app-perfil-admin-p',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './perfil-admin-p.html',
  styleUrls: ['./perfil-admin-p.css']
})
export class PerfilAdminPComponent {
  pagosPendientes: Pago[] = [
    {
      alumno: 'Nombre del Alumno 1',
      curso: 'Curso de JavaScript Avanzado',
      banco: 'Ejemplo Banco',
      referencia: '123456',
      cedula: 'V-12345678'
    }
  ];

  pagosAprobados: Pago[] = [];

  verDetalles(pago: Pago): void {
    alert(
      `Mostrando detalles del pago de ${pago.alumno}:\n` +
      `- Banco: ${pago.banco}\n` +
      `- Referencia: ${pago.referencia}\n` +
      `- Cédula: ${pago.cedula}\n(Simulación)`
    );
  }

  autorizarPago(pago: Pago): void {
    const ok = confirm(
      `¿Estás seguro de que quieres autorizar este pago?\n` +
      `Pago de "${pago.alumno}" para "${pago.curso}"`
    );
    if (!ok) return;

    this.pagosPendientes = this.pagosPendientes.filter(p => p !== pago);
    this.pagosAprobados.push(pago);
    alert('Pago autorizado. El alumno ahora tiene acceso al curso. (Simulación)');
  }

  cerrarSesion() {
    if (confirm('¿Deseas cerrar sesión?')) {
      try { localStorage.clear(); sessionStorage.clear(); } catch (e) {}
      window.location.href = '/';
    }
  }
}

