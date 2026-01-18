import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Pagos } from '../../../services/pagos';
import { Pago } from '../../../core/models/pago';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-historial-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-pagos.html',
})
export class HistorialPagos {

  private authService = inject(AuthService);
  private pagosService = inject(Pagos);
  private router = inject(Router);

  pagos: Pago[] = [];
  rolUsuario = this.authService.getUsuario()?.rol;

  ngOnInit() {
    this.cargarPagos();
  }

  cargarPagos() {
    this.pagosService.misPagos().subscribe({
      next: data => this.pagos = data,
      error: err => console.error('Error al cargar pagos:', err)
    });
  }

  reintentarPago(pago: Pago) {
    this.router.navigate(['/dashboard/pagos/subir-comprobante', pago.inscripcion]);
  }

  verComprobante(url: string) {
    window.open(url, '_blank');
  }
}
