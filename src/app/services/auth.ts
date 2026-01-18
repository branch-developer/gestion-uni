import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8000/api/';

  private _usuario: any = null;

  constructor() {
    const user = localStorage.getItem('usuario');
    if (user) {
      this._usuario = JSON.parse(user);
    }
  }

  // Login: guarda access token y usuario
  login(correo: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login/`, { correo, password }).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          this._usuario = res.usuario;
        }
      })
    );
  }

  // Obtener usuario logueado
  getUsuario() {
    if (this._usuario) return this._usuario;
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(user) : null;
  }

 // Devuelve el usuario logueado con sus cursos y módulos
  getUsuarioCompleto(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}usuarios/me/`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    }).pipe(
      tap(usuario => {
        this._usuario = usuario;              // actualiza _usuario
        localStorage.setItem('usuario', JSON.stringify(usuario)); // opcional
      })
    );
  }

  // Obtener access token
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRol(): string | null {
    return this.getUsuario()?.rol || null;
  }

  // Verificar si está logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout
  logout() {
    localStorage.clear();
    this._usuario = null;
  }
  
    /**
   * Actualizar usuario (solo campos editables)
   */
  updateUsuario(id: number, data: any) {
    const payload = {
      nombre_completo: data.nombre_completo,
      correo: data.correo,
      telefono: data.telefono
    };
    const token = this.getToken();
    return this.http.patch(`${this.apiUrl}${id}/`, payload, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}

