/*proteger ciertas rutas y permitir el acceso solo a usuarios autenticados.*/
import type { CanActivateFn } from "@angular/router"
import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../services/auth.service"

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router)
  const authService = inject(AuthService)

  if (!authService.isAuthenticated()) {
    router.navigate(["/login"])
    return false
  }

  // Llama a un método asíncrono que verifica si el token de autenticación está vigente y, si no, intenta refrescarlo.
  const tokenValid = await authService.checkAndRefreshTokenIfNeeded()

  if (!tokenValid) {
    router.navigate(["/login"])
    return false
  }
 //Si pasó todas las verificaciones, devuelve true y permite acceder a la ruta protegida.
  return true
}
