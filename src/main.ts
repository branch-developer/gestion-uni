import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // Asegúrate de que esta ruta sea correcta
import { appConfig } from './app/app.config'; // <-- Importamos tu configuración con HttpClient

// Al pasarle 'appConfig', Angular usará el router Y el HttpClient que agregaste
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));