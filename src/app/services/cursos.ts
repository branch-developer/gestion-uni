import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Curso } from '../core/models/curso';

@Injectable({
  providedIn: 'root'
})

export class CursosService {

  private cursosAlumno$ = new BehaviorSubject<Curso[]>([]);
  cursosAlumnoObservable$ = this.cursosAlumno$.asObservable();

  private apiUrl = 'http://127.0.0.1:8000/api/cursos/';

  constructor(private http: HttpClient) {}

  getCursos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCurso(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}${id}/`);
  }

  getAlumno(id: string): Observable<any> {
    return this.http.get(`/api/alumnos/${id}`);
  }

  crearCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  actualizarCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}${id}/`, curso);
  }

  eliminarCurso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  listarCursosDisponibles(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}disponibles/`);
  }

  getMisCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}mis_cursos/`);
  }

  getMisCursosAlumno(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}mis-cursos-alumno/`);
  }

  actualizarCursosAlumno() {
    this.getMisCursosAlumno().subscribe((cursos) => this.cursosAlumno$.next(cursos));
  }

  getMisCursosProfesor(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}mis_cursos_profesor/`);
  }

}
