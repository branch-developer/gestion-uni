import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';
import { Profesor } from '../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:8000/api/usuarios/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.auth.getToken();
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.baseUrl, this.getAuthHeaders());
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${id}/`, this.getAuthHeaders());
  }

  createUser(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data, this.getAuthHeaders());
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}${id}/`, data, this.getAuthHeaders());
  }

  activarUsuario(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${id}/activar/`, {}, this.getAuthHeaders());
  }

  desactivarUsuario(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${id}/desactivar/`, {}, this.getAuthHeaders());
  }

  cambiarRol(id: number, rol: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${id}/cambiar_rol/`, { rol }, this.getAuthHeaders());
  }

  cambiarPassword(id: number, newPassword: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}${id}/`, { password: newPassword }, this.getAuthHeaders());
  }

  getProfesores(): Observable<Profesor[]> {
    const token = this.auth.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Profesor[]>('http://127.0.0.1:8000/api/profesores/', { headers });
  }
}

