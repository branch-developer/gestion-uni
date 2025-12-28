import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, FormsModule, RouterModule], // Necesario para usar *ngFor, ngModel, routerLink en el HTML
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

  pagoSeleccionado: Pago | null = null;

  get totalPagos(): number {
    return this.pagosAprobados.reduce((acc, pago) => {
      // Elimina el símbolo $ y convierte a número
      const valor = parseFloat(pago.monto.replace(/[^0-9.-]+/g, ''));
      return acc + (isNaN(valor) ? 0 : valor);
    }, 0);
  }

  cerrarSesion() {
    if (confirm('¿Deseas cerrar sesión?')) {
      window.location.href = '/login';
    }
  }

  verDetalles(pago: Pago) {
    alert(`Viendo detalles del pago de ${pago.alumno} para el curso ${pago.curso}.`);
  }

  autorizarPago(pago: Pago) {
    if (confirm(`¿Autorizar el pago de ${pago.alumno} para ${pago.curso}?`)) {
      // Mover el pago a la lista de aprobados
      this.pagosAprobados.push(pago);
      // Eliminar el pago de la lista de pendientes
      this.pagosPendientes = this.pagosPendientes.filter(p => p.id !== pago.id);
      alert('Pago autorizado.');
    }
  }

  seleccionarPago(pago: Pago) {
    this.pagoSeleccionado = pago;
  }

  cambiarEstado(pago: Pago, estado: string) {
    alert(`Cambiando estado del pago de ${pago.alumno} a ${estado}`);
  }
}