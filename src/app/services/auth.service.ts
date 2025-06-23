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
  private readonly TOKEN_EXPIRY_TIME = 15 * 60 * 1000 // 15 minutes in milliseconds
  private readonly ACCESS_TOKEN_KEY = "access_token"
  private readonly REFRESH_TOKEN_KEY = "refresh_token"
  private readonly TOKEN_CREATED_AT_KEY = "token_created_at"

  constructor() {}

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await axiosService.post<AuthResponse>(config.urls.logIn, credentials)

      // Save tokens and creation timestamp
      this.saveTokens(response.data.accessToken, response.data.refreshToken)

      return response.data
    } catch (error: any) {
      console.error("Error en login:", error)
      throw new Error(error.response?.data?.message || "Error al iniciar sesión")
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await axiosService.post<AuthResponse>(config.urls.register, userData)

      // Save tokens and creation timestamp
      this.saveTokens(response.data.accessToken, response.data.refreshToken)

      return response.data
    } catch (error: any) {
      console.error("Error en registro:", error)
      throw new Error(error.response?.data?.message || "Error al registrar usuario")
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY)
      if (!refreshToken) {
        throw new Error("No hay refresh token disponible")
      }

      console.log("Refreshing access token...")

      // Send refresh token in request body
      const response = await axiosService.post<AuthResponse>(config.urls.refreshAccessToken, {
        refreshToken: refreshToken,
      })

      // Save new tokens and update creation timestamp
      this.saveTokens(response.data.accessToken, response.data.refreshToken)

      console.log("Access token refreshed successfully")

      return response.data
    } catch (error: any) {
      console.error("Error al refrescar token:", error)
      this.logout() // Si falla el refresh, hacer logout
      throw new Error("Sesión expirada")
    }
  }

  // Check if token needs refresh and refresh if necessary
  async checkAndRefreshTokenIfNeeded(): Promise<boolean> {
    if (!this.isAuthenticated()) {
      return false
    }

    if (this.isTokenExpired()) {
      try {
        await this.refreshToken()
        return true
      } catch (error) {
        console.error("Token refresh failed:", error)
        return false
      }
    }

    return true
  }

  // Save tokens with current timestamp
  private saveTokens(accessToken: string, refreshToken: string): void {
    const now = new Date().getTime()
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken)
    localStorage.setItem(this.TOKEN_CREATED_AT_KEY, now.toString())
  }

  // Check if 15 minutes have passed since token creation
  private isTokenExpired(): boolean {
    const tokenCreatedAt = localStorage.getItem(this.TOKEN_CREATED_AT_KEY)
    if (!tokenCreatedAt) {
      return true // If no timestamp, consider expired
    }

    const createdTime = Number.parseInt(tokenCreatedAt)
    const currentTime = new Date().getTime()
    const timeDifference = currentTime - createdTime

    console.log(`Token age: ${Math.floor(timeDifference / 1000 / 60)} minutes`)

    return timeDifference >= this.TOKEN_EXPIRY_TIME
  }

  // Get remaining time before token expires (in minutes)
  getTokenRemainingTime(): number {
    const tokenCreatedAt = localStorage.getItem(this.TOKEN_CREATED_AT_KEY)
    if (!tokenCreatedAt) {
      return 0
    }

    const createdTime = Number.parseInt(tokenCreatedAt)
    const currentTime = new Date().getTime()
    const timeDifference = currentTime - createdTime
    const remainingTime = this.TOKEN_EXPIRY_TIME - timeDifference

    return Math.max(0, Math.floor(remainingTime / 1000 / 60)) // Return minutes
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    localStorage.removeItem(this.TOKEN_CREATED_AT_KEY)
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY)
    const tokenCreatedAt = localStorage.getItem(this.TOKEN_CREATED_AT_KEY)
    return !!(token && tokenCreatedAt)
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  // Decodificar JWT para obtener información del usuario
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
