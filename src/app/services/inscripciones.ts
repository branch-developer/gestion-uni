import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion, InscripcionCreate } from '../core/models/inscripcion';

@Injectable({
  providedIn: 'root'
})

export class Inscripciones {
  private baseUrl = 'http://localhost:8000/api/inscripciones/';

  constructor(private http: HttpClient) {}

  // Listar todas las inscripciones (filtrado lo hace el backend)
  listar(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.baseUrl);
  }

  // Crear inscripción nueva
  crear(data: InscripcionCreate): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.baseUrl, data);
  }

  // Actualizar inscripción (estado, pago, etc.)
  actualizar(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.put<Inscripcion>(
      `${this.baseUrl}${inscripcion.id}/`,
      inscripcion
    );
  }
}