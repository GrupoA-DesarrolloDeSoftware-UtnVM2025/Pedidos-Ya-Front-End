import type { Routes } from "@angular/router"

// ... (tus otros imports)

import { DeliveryFormComponent } from "./pages/nuevo-delivery/nuevo-delivery.component"
// ▼▼▼ 1. IMPORTA EL NUEVO COMPONENTE ▼▼▼
import { EstadoFormComponent } from "./pages/estado/estado.component"
import { RegisterComponent } from "./pages/register/register.component"
import { LoginComponent } from "./pages/login/login.component"
import { DeliveryComponent } from "./pages/delivery/delivery.component"
import { UbicacionFormComponent } from "./pages/ubicacion/ubicacion.component"
import { TemplateComponent } from "./pages/template/template.component"

export const routes: Routes = [
  // Login and register routes (no template wrapper)
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  // Main application routes with template wrapper
  {
    path: "",
    component: TemplateComponent,
    children: [
      { path: "delivery", component: DeliveryComponent },
      { path: "delivery/nuevo", component: DeliveryFormComponent },
      { path: "delivery/estado/:id", component: EstadoFormComponent },
      { path: "delivery/ubicacion/:id", component: UbicacionFormComponent },
      { path: "", redirectTo: "/login", pathMatch: "full" },
    ],
  },

  // Fallback redirect
  { path: "**", redirectTo: "/login" },
]
