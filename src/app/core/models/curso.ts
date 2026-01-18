// src/app/core/models/curso.model.ts
import { Usuario } from './user';

export interface Leccion {
  id: number;
  titulo: string;
  contenido?: string | null; // null si es preview
  orden: number;
}

export interface Modulo {
  id?: number;
  titulo: string;
  orden: number;
  lecciones?: Leccion[];
  evaluaciones?: Evaluacion[];
}

export interface Pagina {
  id: number;
  titulo: string;
  contenido: string;
}

export interface Evaluacion {
  id: number;
  titulo: string;
  preguntas: Pregunta[];
}

export interface Pregunta {
  id: number;
  texto: string;
  opciones: string[];
  respuestaCorrecta?: string; // opcional si quieres validación en frontend
}

export interface Pago {
  id: number;
  metodo: string;         // transferencia, pago móvil, etc.
  comprobanteUrl: string; // URL del comprobante subido
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  fecha: string;
}

export interface Curso {
  id: number;
  titulo: string;
  descripcion_breve?: string;
  descripcion: string;
  imagen?: string;
  precio?: number;
  estado: 'activo' | 'inactivo' | 'borrador';
  fecha_creacion?: string;
  progreso?: number;       // porcentaje completado
  paginas?: Pagina[];      // contenido del curso
  evaluacion?: Evaluacion; // evaluaciones relacionadas
  pagos?: Pago[];          // pagos asociados
  profesor: number; // ID del profesor
  modulos?: Modulo[];
  alumnos?: Usuario[]; // estudiantes inscritos 
  inscrito?: boolean;
  estadoInscripcion?: 'pendiente' | 'aprobado' | 'rechazado';

}

export interface CursoDetalle {
  id: number;
  titulo: string;
  descripcion: string;
  profesor: number;
  inscrito?: boolean;
  estado?: 'activo' | 'inactivo' | 'borrador'; 
  estadoInscripcion?: 'pendiente' | 'aprobado' | 'rechazado';
  modulos?: Modulo[];
}

