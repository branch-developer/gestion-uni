import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pagos } from '../../../services/pagos';
import { NotificacionService } from '../../../services/notificacion';

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
  private notify = inject(NotificacionService);

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
    const file = event.target.files[0];
    
    if (file) {
      // Validar tipos permitidos
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      
      if (!allowedTypes.includes(file.type)) {
        // USAMOS TU NOTIFICACIÓN VISUAL EN LUGAR DE ALERT
        this.notify.show('Formato de archivo no válido. Solo se permiten imágenes JPG o PNG.', 'error');
        
        // Limpiamos el input para que no intente subir un archivo inválido
        event.target.value = '';
        return;
      }

      this.comprobante = file;
    }
  }

  enviarPago(event: Event) {
    event.preventDefault(); // evita que el form haga submit nativo

    if (!this.comprobante) {
      this.notify.show('Debe seleccionar un archivo', 'error');
      return;
    }

    // 1. Validación de campos vacíos
    // Verificamos si los strings están vacíos o si el archivo no existen
    if (!this.metodo_pago || !this.referencia || !this.monto) {
      this.notify.show('Todos los campos son obligatorios', 'error');
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