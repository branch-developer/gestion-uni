import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface Curso {
  id_curso: number;
  titulo: string;
  descripcion_breve?: string;
  fecha_inscripcion?: string;
}

export interface Alumno {
  nombre_completo: string;
  correo: string;
  telefono?: string;
  cedula?: string;
  fecha_registro?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private baseUrl = 'http://localhost:8000/api/';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  getAlumno(): Observable<Alumno> {
    const token = this.getToken();
    return this.http.get<Alumno>(`${this.baseUrl}usuarios/me/`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  }

  getMisCursos(): Observable<Curso[]> {
    const token = this.getToken();
    return this.http.get<Curso[]>(`${this.baseUrl}cursos/mis_cursos/`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  }
}
