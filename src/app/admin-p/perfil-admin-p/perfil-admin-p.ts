import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pago {
  id: number;
  alumno: string;
  curso: string;
  monto: string;
  fecha: string;
}

@Component({
  selector: 'app-perfil-admin-p',
  standalone: true,
  imports: [CommonModule], // Necesario para usar *ngFor en el HTML
  templateUrl: './perfil-admin-p.html',
  
})
export class PerfilAdminPComponent {

  // Datos de ejemplo para que la vista funcione
  pagosPendientes: Pago[] = [
    { id: 2, alumno: 'Ana Gómez', curso: 'JavaScript Avanzado', monto: '$95', fecha: '21/12/2025' }
  ];

  pagosAprobados: Pago[] = [
    // La vista ya tiene un ejemplo estático, este array puede estar vacío inicialmente
  ];

  cerrarSesion() {
    if (confirm('¿Deseas cerrar sesión?')) {
      window.location.href = '/login';
    }
  }

  verDetalles(pago: any) {
    alert(`Viendo detalles del pago de ${pago.alumno} para el curso ${pago.curso}.`);
  }

  autorizarPago(pago: any) {
    if (confirm(`¿Autorizar el pago de ${pago.alumno} para ${pago.curso}?`)) {
      // Mover el pago a la lista de aprobados
      this.pagosAprobados.push(pago);
      // Eliminar el pago de la lista de pendientes
      this.pagosPendientes = this.pagosPendientes.filter(p => p.id !== pago.id);
      alert('Pago autorizado.');
    }
  }
}