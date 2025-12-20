import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';

export const routes: Routes = [
      // Ruta por defecto: que vaya al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login
  { path: 'login', component: LoginComponent },
];
