import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/login/'; // Asegúrate que esta sea tu URL de Django

  login(correo: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { correo, password }).pipe(
      tap(res => {
        // Guardamos el token y el rol en el navegador
        if (res.access) {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('user_role', res.usuario.rol);
      }

      })
    );
  }

  // Método para saber si el usuario está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para cerrar sesión
  logout() {
    localStorage.clear();
  }
}
