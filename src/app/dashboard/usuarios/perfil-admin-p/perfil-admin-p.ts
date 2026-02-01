import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Pagos } from '../../../services/pagos'; 
import { Pago } from '../../../core/models/pago'; 
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-perfil-admin-p',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil-admin-p.html',
})
export class PerfilAdminPComponent implements OnInit {
  private pagosService = inject(Pagos);
  private router = inject(Router);
  private authService = inject(AuthService);

  pagosPendientes: Pago[] = [];
  pagosAprobados: Pago[] = [];
  modalPago: Pago | null = null;
  motivoRechazo: string = '';

  usuarioActual: any;
  rolUsuario: string = '';

  ngOnInit(): void {
    this.usuarioActual = this.authService.getUsuario();
    this.cargarDatos();
  }

  cargarDatos() {
    // Cargar Pendientes
    this.pagosService.pagosPendientes().subscribe(data => this.pagosPendientes = data);
    
    // Cargar Historial para los Aprobados (o crear un método en el service que solo traiga aprobados)
    this.pagosService.misPagos().subscribe(data => {
      this.pagosAprobados = data.filter(p => p.estado === 'aprobado');
    });
  }

  get totalDineroAprobado(): number {
    return this.pagosAprobados.reduce((acc, p) => acc + parseFloat(p.monto.toString()), 0);
  }

  abrirModal(p: Pago) {
    this.modalPago = p;
    this.motivoRechazo = '';
  }

  aprobarPago() {
    this.router.navigate(['/dashboard/pagos/aprobar']);
  }

  historialPagos() {
    this.router.navigate(['/dashboard/pagos/historial']);
  }

  cerrarModal() {
    this.modalPago = null;
  }

  rechazarPago() {
    if (!this.modalPago || !this.motivoRechazo) {
      alert('Por favor ingrese un motivo');
      return;
    }
    this.pagosService.rechazarPago(this.modalPago.id, this.motivoRechazo).subscribe(() => {
      this.cargarDatos();
      this.cerrarModal();
      alert('Pago rechazado');
    });
  }

  verComprobante(url: string) {
    window.open(url, '_blank');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}