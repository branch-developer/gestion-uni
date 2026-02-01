import { Component, OnInit } from '@angular/core';
import { Evaluaciones } from '../../../services/evaluaciones';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CursosService } from '../../../services/cursos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autorizar-certificados',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './autorizar-certificados.html'
})
export class AutorizarCertificados implements OnInit {
  // Fuentes de datos originales (sin tocar)
  intentos: any[] = []; 
  pendientesAutorizacion: any[] = [];
  cursos: any[] = [];
  
  // Datos que se muestran en el HTML (los que se filtran)
  intentosFiltrados: any[] = [];
  pendientesFiltrados: any[] = [];
  
  cargando: boolean = true;
  cursoSeleccionado: string = '';
  busquedaNombre: string = '';

  constructor(private service: Evaluaciones, private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarDatos();
  }

  cargarCursos(): void {
    this.cursosService.getCursos().subscribe(
      (data: any) => this.cursos = data,
      error => console.error('Error al cargar cursos:', error)
    );
  }

  cargarDatos(): void {
    this.cargando = true;
    
    // 1. Cargar Historial
    this.service.obtenerHistorial().subscribe((res: any) => {
      this.intentos = res; 
      this.intentosFiltrados = [...this.intentos];
      this.aplicarFiltros();
      this.cargando = false;
    });

    // 2. Cargar Pendientes
    this.service.getPendientesAutorizacion().subscribe((res: any) => {
      this.pendientesAutorizacion = res;
      this.pendientesFiltrados = [...this.pendientesAutorizacion];
      this.aplicarFiltros();
    });
  }

  aplicarFiltros(): void {
    const curso = this.cursoSeleccionado.toLowerCase();
    const nombre = this.busquedaNombre.toLowerCase();

    // Filtrar Pendientes
    this.pendientesFiltrados = this.pendientesAutorizacion.filter(intento => {
      const cumpleCurso = !curso || (intento.curso_nombre?.toLowerCase().includes(curso));
      const cumpleNombre = !nombre || (intento.estudiante_nombre?.toLowerCase().includes(nombre));
      return cumpleCurso && cumpleNombre;
    });

    // Filtrar Historial
    this.intentosFiltrados = this.intentos.filter(intento => {
      const cumpleCurso = !curso || (intento.curso_nombre?.toLowerCase().includes(curso));
      const cumpleNombre = !nombre || (intento.estudiante_nombre?.toLowerCase().includes(nombre));
      return cumpleCurso && cumpleNombre;
    });
  }

  limpiarFiltros(): void {
    this.cursoSeleccionado = '';
    this.busquedaNombre = '';
    this.aplicarFiltros();
  }

  autorizarEstudiante(intentoId: number, nombreEstudiante: string): void {
    if (confirm(`¿Autorizar certificado para ${nombreEstudiante}?`)) {
      this.service.autorizarCertificado(intentoId).subscribe(
        (response) => {
          alert(response.mensaje);
          this.cargarDatos(); 
        },
        (error) => alert('Error: ' + (error.error?.detail || 'Error desconocido'))
      );
    }
  }

  estadoEtiqueta(estado: string): string {
    const estados: { [key: string]: string } = {
      'en_progreso': 'En progreso',
      'finalizado': 'Finalizado',
      'corregido': 'Corregido'
    };
    return estados[estado] || estado;
  }
}