import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pago } from '../core/models/pago';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Pagos {
  
  private baseUrl = 'http://127.0.0.1:8000/api/pagos/';

  constructor(private http: HttpClient) {}

  crearPago(data: FormData) {
    return this.http.post<Pago>(this.baseUrl, data);
  }

  // Para estudiantes
  misPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.baseUrl}`);
  }

  // Para admin: pagos pendientes
  pagosPendientes(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.baseUrl}pendientes/`);
  }

  // Aprobar pago (PATCH)
  aprobarPago(id: number): Observable<any> {
  const base = 'http://127.0.0.1:8000/api/pagos'; // sin barra final
  return this.http.patch(`${base}/${id}/aprobar/`, {}); // añade la barra solo aquí
}

  // Rechazar pago (PATCH) con motivo
  rechazarPago(id: number, motivo: string): Observable<any> {
  const base = 'http://127.0.0.1:8000/api/pagos'; // sin barra final
  return this.http.patch(`${base}/${id}/rechazar/`, {motivo}); // añade la barra solo aquí
  }
}