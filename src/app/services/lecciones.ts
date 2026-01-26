import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leccion } from '../core/models/leccion';

@Injectable({
  providedIn: 'root'
})

export class Lecciones {

  private baseUrl = 'http://127.0.0.1:8000/api/lecciones/';

  constructor(private http: HttpClient) {}

  getLecciones(): Observable<Leccion[]> {
    return this.http.get<Leccion[]>(this.baseUrl);
  }

  getLeccionById(id: number) {
    return this.http.get<Leccion>(`${this.baseUrl}${id}/`);
  }

  crearLeccion(leccion: any): Observable<Leccion> {
    return this.http.post<Leccion>(this.baseUrl, leccion);
  }

  completarLeccion(leccionId: number) {
    return this.http.post(`${this.baseUrl}${leccionId}/completar/`, {});
  }
}
