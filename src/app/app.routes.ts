import { Routes } from '@angular/router';

// ... (tus otros imports)

import { DeliveryFormComponent } from './pages/nuevo-delivery/nuevo-delivery.component';
// ▼▼▼ 1. IMPORTA EL NUEVO COMPONENTE ▼▼▼
import { EstadoFormComponent } from './pages/estado/estado.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { UbicacionFormComponent } from './pages/ubicacion/ubicacion.component';

export const routes: Routes = [
  // ... (rutas de login, register)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas principales de la aplicación

  { path: 'delivery', component: DeliveryComponent },
  { path: 'delivery/nuevo', component: DeliveryFormComponent },
  // ▼▼▼ 2. AÑADE LA NUEVA RUTA CON EL PARÁMETRO :id ▼▼▼
  { path: 'delivery/estado/:id', component: EstadoFormComponent },
  { path: 'delivery/ubicacion/:id', component: UbicacionFormComponent },

  // ... (redirecciones)
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
