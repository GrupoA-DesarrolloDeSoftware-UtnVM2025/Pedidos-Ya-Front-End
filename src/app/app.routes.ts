/*Exporta una constante routes de tipo Routes, que contiene todas las rutas de tu app, es decir, qué componente se muestra según la URL*/
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
  /* rutas publicas sin necesidad de loguearse*/
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  {
    path: "",
    component: TemplateComponent,
    canActivate: [authGuard],
    children: [
      /*rutas protegidas necesitan que este logueado, ya que siguen de delivery y tiene un Authguard*/
      { path: "delivery", component: DeliveryComponent },
      { path: "delivery/nuevo", component: DeliveryFormComponent },
      { path: "delivery/estado/:id", component: EstadoFormComponent },
      { path: "delivery/ubicacion/:id", component: UbicacionFormComponent },
      { path: "", redirectTo: "/delivery", pathMatch: "full" },
    ],
  },
  /*Si la URL no coincide con ninguna de las anteriores, redirige a /login*/

  { path: "**", redirectTo: "/login" },
]
