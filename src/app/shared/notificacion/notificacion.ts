import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../services/notificacion';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (data) {
      <div class="fixed top-5 right-5 z-[999] animate-fade-in">
        <div [ngClass]="{
          'border-emerald-500 bg-white text-emerald-900': data.type === 'success',
          'border-red-500 bg-white text-red-900': data.type === 'error'
        }" class="flex items-center p-4 rounded-xl shadow-2xl border-l-4 min-w-[320px] max-w-md ring-1 ring-black ring-opacity-5">
          
          @if (data.type === 'success') {
            <div class="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          }
          
          @if (data.type === 'error') {
            <div class="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          }

          <div class="ml-4 flex-1">
            <p class="text-sm font-bold tracking-tight">{{ data.type === 'success' ? 'Completado' : 'Error' }}</p>
            <p class="text-sm text-gray-500">{{ data.message }}</p>
          </div>

          <button (click)="data = null" class="ml-4 text-gray-400 hover:text-gray-600">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .animate-fade-in {
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class NotificacionComponent implements OnInit {
  private notifyService = inject(NotificacionService);
  data: any = null;

  ngOnInit() {
    this.notifyService.notifications$.subscribe(res => {
      this.data = res;
      setTimeout(() => this.data = null, 5000);
    });
  }
}