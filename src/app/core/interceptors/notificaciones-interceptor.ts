import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';
import { NotificacionService } from '../../services/notificacion';

export const notificacionesInterceptor: HttpInterceptorFn = (req, next) => {
  // En interceptores de función, usamos inject() en lugar de constructor
  const notify = inject(NotificacionService);

  return next(req).pipe(
    tap(event => {
      // Si la respuesta es exitosa y es una operación de guardado/borrado
      if (event instanceof HttpResponse && ['POST', 'PUT', 'DELETE'].includes(req.method)) {
        notify.show('¡Operación realizada con éxito!', 'success');
      }
    }),
  // notificaciones.interceptor.ts
  catchError((error: HttpErrorResponse) => {
    let msg = 'Ocurrió un error inesperado';

    // 1. Si el servidor envió un mensaje de error específico, ÚSALO
    if (error.error && error.error.error) {
      msg = error.error.error; 
    } 
    // 2. Si no hay mensaje del servidor, usa los genéricos por Status
    else {
      if (error.status === 0) msg = 'No hay conexión con el servidor';
      else if (error.status === 401) msg = 'Credenciales inválidas o sesión expirada';
      else if (error.status === 404) msg = 'No se encontró el recurso';
      else if (error.status === 500) msg = 'Error interno del servidor';
    }

    notify.show(msg, 'error');
    return throwError(() => error);
  })
)
};