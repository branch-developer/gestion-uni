import { Component, inject } from '@angular/core';
import { Pagos } from '../../../services/pagos';
import { Pago } from '../../../core/models/pago';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { CursosService } from '../../../services/cursos';

@Component({
  selector: 'app-pagos-pendientes',
  templateUrl: './pagos-pendientes.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})

export class PagosPendientes {
  pagos: Pago[] = [];
  modalPago: Pago | null = null;
  motivoRechazo: string = '';
  confirmMessage: string = '';

  private pagosService = inject(Pagos);
  private cursosService = inject(CursosService); 

  ngOnInit() {
    this.cargarPagos();
  }

  cargarPagos() {
    this.pagosService.pagosPendientes().subscribe((data: Pago[]) => this.pagos = data);
  }

  abrirModal(p: Pago) {
    this.modalPago = p;
    this.motivoRechazo = '';
    this.confirmMessage = '';
  }

  cerrarModal() {
    this.modalPago = null;
    this.confirmMessage = '';
  }

  aprobarPagoModal() {
    if (!this.modalPago) return;
      console.log('ID del pago a aprobar:', this.modalPago.id);
    if (!this.modalPago.comprobante_url) {
      this.confirmMessage = 'No se puede aprobar: no hay comprobante';
      return;
    }
    this.pagosService.aprobarPago(this.modalPago.id).subscribe({
      next: (res) => {
        this.confirmMessage = 'Pago aprobado satisfactoriamente';

        // Actualizamos los cursos del alumno
        this.cursosService.actualizarCursosAlumno();

        setTimeout(() => {
          this.cargarPagos(); // refresca la tabla de pagos pendientes
          this.cerrarModal();
        }, 800);
      },
      error: () => this.confirmMessage = 'Error al aprobar el pago'
    });
  }

  // Método para actualizar cursos del alumno
  actualizarCursosAlumno() {
      this.cursosService.getMisCursosAlumno().subscribe({
        next: (cursos) => {
          console.log('Cursos del alumno actualizados', cursos);
        },
        error: () => console.error('Error al actualizar cursos del alumno')
      });
    }

  rechazarPagoModal() {
    if (!this.modalPago) return;
    this.pagosService.rechazarPago(this.modalPago.id, this.motivoRechazo).subscribe(() => {
      this.confirmMessage = 'Pago rechazado';
      setTimeout(() => {
        this.cargarPagos();
        this.cerrarModal();
      }, 800);
    });
  }

  verComprobante(url: string) {
    window.open(url, '_blank');
  }
}