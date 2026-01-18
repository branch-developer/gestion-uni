// src/app/core/models/inscripcion.model.ts
import { Curso, Pago } from './curso';
import { Usuario } from './user';

export interface Inscripcion {
  id: number;
  estudiante: Usuario;
  curso: Curso;
  pago?: Pago;
  estado: 'pendiente' | 'activa' | 'rechazada';
  fecha_inscripcion: string;
}

export interface InscripcionCreate {
  curso_id: number;
}
