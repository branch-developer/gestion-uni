import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pagos } from '../../../services/pagos';

@Component({
  selector: 'app-subir-comprobante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subir-comprobante.html',
})

export class SubirComprobante {

  private pagosService = inject(Pagos);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  inscripcionId!: number;
  metodo_pago = '';
  referencia = '';
  monto!: number;
  comprobante!: File;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No se recibió el ID de la inscripción');
      this.router.navigate(['/dashboard/cursos-disponibles']);
      return;
    }
    this.inscripcionId = Number(id);
  }


  onFileSelected(event: any) {
    this.comprobante = event.target.files[0];
  }

  enviarPago(event: Event) {
    event.preventDefault(); // evita que el form haga submit nativo

    if (!this.comprobante) {
      alert('Debe seleccionar un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('inscripcion', this.inscripcionId.toString());
    formData.append('metodo_pago', this.metodo_pago);
    formData.append('referencia', this.referencia);
    formData.append('monto', this.monto.toString());
    formData.append('captura_comprobante', this.comprobante);

    this.pagosService.crearPago(formData).subscribe({
      next: () => {
        alert('Pago enviado correctamente');
        this.router.navigate(['/dashboard/pagos/historial']);
      },
      error: err => {
        const msg = err.error?.detail || 'Error al enviar pago';
        alert('No se pudo enviar el pago: ' + msg);
      }
    });
  }

}