export interface RecursoLeccion {
  id: number;
  tipo: 'video' | 'pdf' | 'archivo' | 'enlace';
  archivo: string;
  url_enlace: string;
  descripcion: string;
  orden: number;
}

export interface Leccion {
  id: number;
  modulo: number;
  titulo: string;
  contenido: string;
  curso_id: number;
  orden: number;
  recursos: RecursoLeccion[];
}
