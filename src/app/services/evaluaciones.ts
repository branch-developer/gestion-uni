import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Evaluaciones {
  private baseUrl = 'http://127.0.0.1:8000/api/evaluaciones/';

  constructor(private http: HttpClient) {}

  // Obtener todas las evaluaciones
  getEvaluaciones(): Observable<any> {
    return this.http.get(this.baseUrl, { responseType: 'json' });
  }

  obtenerEvaluacion(id: number): Observable<any> {
    return this.getEvaluacion(id);
  }
  
  // Obtener evaluación por ID
  getEvaluacion(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}/`, { responseType: 'json' });
  }

  // Crear evaluación (solo profesor)
  crearEvaluacion(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data, { responseType: 'json' });
  }

  // Responder evaluación
  responderEvaluacion(payload: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/intentos/', payload, { responseType: 'json' });
  }

  // Obtener historial de evaluaciones del estudiante
  obtenerHistorial(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/intentos/', { responseType: 'json' });
  }

  // Iniciar intento de evaluación
  iniciarIntento(evaluacionId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}intentos/`, { evaluacion: evaluacionId }, { responseType: 'json' });
  }

  // Enviar respuesta de alumno
  enviarRespuesta(respuesta: any): Observable<any> {
    return this.http.post(`${this.baseUrl}respuestas-alumno/`, respuesta, { responseType: 'json' });
  }

  // Finalizar intento
  finalizarIntento(intentoId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}intentos/${intentoId}/finalizar/`, {}, { responseType: 'json' });
  }

  // Obtener intentos/calificaciones
  getIntentos(): Observable<any> {
    return this.http.get(`${this.baseUrl}intentos/`, { responseType: 'json' });
  }
}
