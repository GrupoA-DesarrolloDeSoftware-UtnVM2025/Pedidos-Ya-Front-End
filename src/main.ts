/*Se encarga de inicializar ("bootstrapping") tu aplicación Angular, usando:
Tu componente raíz (AppComponent).
Tu configuración global (appConfig), que define rutas, guards, y zona de detección de cambios.*/
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
