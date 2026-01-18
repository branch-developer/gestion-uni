// src/app/core/models/user.model.ts
import { Curso } from './curso';

export type RolUsuario = 'estudiante' | 'profesor' | 'admin-c' | 'admin-p';

export interface Usuario {
  id_usuario: number;
  username: string;
  nombre_completo: string;
  correo: string;
  password?: string; 
  telefono?: string | null;
  cedula?: string | null;
  rol: RolUsuario;
  estado: boolean;
  fecha_registro: string;
  cursos?: Curso[]; // cursos inscritos para estudiantes
}

export interface Profesor {
  id_usuario: number;
  nombre_completo: string;
  correo: string;
}
