import { Injectable } from "@angular/core"
import { axiosService } from "./axiosClient"
import { config } from "../config/env"

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    accessToken: string
    refreshToken: string
}

export interface RegisterRequest {
    email: string
    password: string
}

export interface RefreshTokenRequest {
    refreshToken: string
}

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor() {}

    async login(credentials: LoginRequest): Promise<AuthResponse> {
        try {
            const response = await axiosService.post<AuthResponse>(config.urls.logIn, credentials)

            // Guardar tokens en localStorage
            localStorage.setItem("access_token", response.data.accessToken)
            localStorage.setItem("refresh_token", response.data.refreshToken)

            return response.data
        } catch (error: any) {
            console.error("Error en login:", error)
            throw new Error(error.response?.data?.message || "Error al iniciar sesión")
        }
    }

    async register(userData: RegisterRequest): Promise<AuthResponse> {
        try {
            const response = await axiosService.post<AuthResponse>(config.urls.register, userData)

            // Guardar tokens en localStorage después del registro
            localStorage.setItem("access_token", response.data.accessToken)
            localStorage.setItem("refresh_token", response.data.refreshToken)

            return response.data
        } catch (error: any) {
            console.error("Error en registro:", error)
            throw new Error(error.response?.data?.message || "Error al registrar usuario")
        }
    }

    async refreshToken(): Promise<AuthResponse> {
        try {
            const refreshToken = localStorage.getItem("refresh_token")
            if (!refreshToken) {
                throw new Error("No hay refresh token disponible")
            }

            // Send refresh token in request body
            const response = await axiosService.post<AuthResponse>(config.urls.refreshAccessToken, {
                refreshToken: refreshToken,
            })

            // Actualizar tokens
            localStorage.setItem("access_token", response.data.accessToken)
            if (response.data.refreshToken) {
                localStorage.setItem("refresh_token", response.data.refreshToken)
            }

            return response.data
        } catch (error: any) {
            console.error("Error al refrescar token:", error)
            this.logout() // Si falla el refresh, hacer logout
            throw new Error("Sesión expirada")
        }
    }

    logout(): void {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem("access_token")
        if (!token) return false

        // Check if token is expired (optional - you can add JWT decode logic here)
        try {
            const payload = JSON.parse(atob(token.split(".")[1]))
            const currentTime = Math.floor(Date.now() / 1000)

            // If token is expired, try to refresh it
            if (payload.exp && payload.exp < currentTime) {
                console.log("Access token is expired")
                return false
            }

            return true
        } catch (error) {
            console.error("Error checking token validity:", error)
            return false
        }
    }

    getAccessToken(): string | null {
        return localStorage.getItem("access_token")
    }

    getRefreshToken(): string | null {
        return localStorage.getItem("refresh_token")
    }

    // Check if access token is about to expire (within 2 minutes)
    isTokenExpiringSoon(): boolean {
        const token = this.getAccessToken()
        if (!token) return true

        try {
            const payload = JSON.parse(atob(token.split(".")[1]))
            const currentTime = Math.floor(Date.now() / 1000)
            const expirationTime = payload.exp

            // Check if token expires within 2 minutes (120 seconds)
            return expirationTime - currentTime < 120
        } catch (error) {
            console.error("Error checking token expiration:", error)
            return true
        }
    }

    // Proactively refresh token if it's about to expire
    async checkAndRefreshToken(): Promise<void> {
        if (this.isTokenExpiringSoon()) {
            try {
                await this.refreshToken()
                console.log("Token refreshed proactively")
            } catch (error) {
                console.error("Proactive token refresh failed:", error)
                // Don't throw error here, let the interceptor handle it
            }
        }
    }

    // Decodificar JWT para obtener información del usuario (opcional)
    getUserFromToken(): any {
        const token = this.getAccessToken()
        if (!token) return null

        try {
            const payload = JSON.parse(atob(token.split(".")[1]))
            return payload
        } catch (error) {
            console.error("Error al decodificar token:", error)
            return null
        }
    }
}
