import type { CanActivateFn } from "@angular/router"
import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../services/auth.service"

export const authGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router)
    const authService = inject(AuthService)

    const accessToken = localStorage.getItem("access_token")

    if (!accessToken) {
        // No token, redirect to login
        router.navigate(["/login"])
        return false
    }

    // Check if token is valid
    if (!authService.isAuthenticated()) {
        // Token is expired, try to refresh
        try {
            await authService.refreshToken()
            return true
        } catch (error) {
            // Refresh failed, redirect to login
            router.navigate(["/login"])
            return false
        }
    }

    // Check if token is about to expire and refresh proactively
    try {
        await authService.checkAndRefreshToken()
    } catch (error) {
        // If proactive refresh fails, still allow access
        // The interceptor will handle it when the actual request fails
        console.warn("Proactive token refresh failed:", error)
    }

    return true
}
