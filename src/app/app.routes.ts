import type { Routes } from "@angular/router"

import { DeliveryFormComponent } from "./pages/nuevo-delivery/nuevo-delivery.component"

import { EstadoFormComponent } from "./pages/estado/estado.component"
import { RegisterComponent } from "./pages/register/register.component"
import { LoginComponent } from "./pages/login/login.component"
import { DeliveryComponent } from "./pages/delivery/delivery.component"
import { UbicacionFormComponent } from "./pages/ubicacion/ubicacion.component"
import { TemplateComponent } from "./pages/template/template.component"
import { authGuard } from "./guards/auth.guard"

export const routes: Routes = [

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  {
    path: "",
    component: TemplateComponent,
    canActivate: [authGuard],
    children: [
      { path: "delivery", component: DeliveryComponent },
      { path: "delivery/nuevo", component: DeliveryFormComponent },
      { path: "delivery/estado/:id", component: EstadoFormComponent },
      { path: "delivery/ubicacion/:id", component: UbicacionFormComponent },
      { path: "", redirectTo: "/delivery", pathMatch: "full" },
    ],
  },

  { path: "**", redirectTo: "/login" },
]
