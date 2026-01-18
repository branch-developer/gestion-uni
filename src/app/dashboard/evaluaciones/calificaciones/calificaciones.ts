import { Component, OnInit } from '@angular/core';
import { Evaluaciones } from '../../../services/evaluaciones';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './calificaciones.html'
})
export class Calificaciones implements OnInit {
  intentos: any[] = []; 
  cargando: boolean = true;

  constructor(private service: Evaluaciones) {}

  ngOnInit(): void {
    this.service.obtenerHistorial().subscribe((res: any) => {
      this.intentos = res; // TypeScript confía en ti que es un array
      this.cargando = false;
    }, (err) => {
      console.error(err);
      this.cargando = false;
    });
  }

  estadoEtiqueta(estado: string): string {
    switch (estado) {
      case 'en_progreso': return 'En progreso';
      case 'finalizado': return 'Finalizado';
      case 'corregido': return 'Corregido';
      default: return estado;
    }
  }
}