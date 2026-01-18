import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config'; 

// Al pasarle 'appConfig', Angular usará el router Y el HttpClient
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));