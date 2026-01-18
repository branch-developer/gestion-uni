import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificacionService {
  // Un "emisor" de mensajes
  private notificationSubject = new Subject<{message: string, type: 'success' | 'error'}>();
  notifications$ = this.notificationSubject.asObservable();

  show(message: string, type: 'success' | 'error' = 'success') {
    this.notificationSubject.next({ message, type });
  }
}