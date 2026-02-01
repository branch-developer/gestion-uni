import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursosService } from '../../../services/cursos';
import { Evaluaciones } from '../../../services/evaluaciones';

@Component({
  selector: 'app-exportar-certificados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exportar-certificados.html',
})
export class ExportarCertificados implements OnInit {
  cursos: any[] = [];
  autorizadosFiltrados: any[] = []; 
  
  cursoSeleccionadoId: string = '';
  cargando: boolean = false;

  constructor(
    private router: Router, 
    private cursosService: CursosService,
    private evaluacionesService: Evaluaciones
  ) {}

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarTodos(); // Cargar todo al iniciar
  }

  cargarCursos(): void {
    this.cursosService.getCursos().subscribe({
      next: (data) => this.cursos = data,
      error: (err) => console.error('Error al cargar cursos:', err)
    });
  }

  // Carga inicial de todos los estudiantes autorizados de todos los cursos
  cargarTodos(): void {
    this.cargando = true;
    this.evaluacionesService.obtenerHistorial().subscribe({
      next: (res: any[]) => {
        // Filtramos solo los que tienen el "check" de autorización
        this.autorizadosFiltrados = res.filter(a => a.aprobado && a.autorizado_profesor);
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        console.error('Error al cargar historial completo');
      }
    });
  }

  onCursoChange(): void {
    // Si el usuario selecciona la opción vacía, recargamos todos
    if (!this.cursoSeleccionadoId) {
      this.cargarTodos();
      return;
    }

    this.cargando = true;
    // Usamos el método que ya comprobaste que funciona para filtrar por curso
    this.evaluacionesService.getAutorizadosPorCurso(Number(this.cursoSeleccionadoId)).subscribe({
      next: (res: any[]) => {
        this.autorizadosFiltrados = res; 
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        alert('Error al cargar los datos del curso');
      }
    });
  }

  exportarCSV(): void {
    // 1. Validar que tengamos datos en la tabla
    if (this.autorizadosFiltrados.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    // 2. Definir los encabezados (la primera fila del Excel)
    const headers = ['Nombre', 'Correo', 'Curso', 'Fecha Autorización', 'Autorizado Por'];
    
    // 3. Mapear los datos exactamente como están en tu Serializer de Django
    const rows = this.autorizadosFiltrados.map(a => [
      `"${a.estudiante_nombre || ''}"`,
      `"${a.estudiante_correo || ''}"`,
      `"${a.curso_nombre || ''}"`,
      `"${a.fecha_autorizacion ? new Date(a.fecha_autorizacion).toLocaleDateString() : ''}"`,
      `"${a.profesor_nombre || 'N/A'}"` // Usamos profesor_nombre igual que en el serializer
    ]);

    // 4. Unir encabezados y filas con saltos de línea
    const csvContent = [
      headers.join(','), 
      ...rows.map(r => r.join(','))
    ].join('\n');

    // 5. Crear el archivo con BOM (para que Excel reconozca tildes y eñes)
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // 6. Nombre del archivo dinámico
    const nombreArchivo = `Reporte_Certificados_${new Date().getTime()}.csv`;
    
    link.href = url;
    link.setAttribute('download', nombreArchivo);
    document.body.appendChild(link);
    link.click();
    
    // Limpieza
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}