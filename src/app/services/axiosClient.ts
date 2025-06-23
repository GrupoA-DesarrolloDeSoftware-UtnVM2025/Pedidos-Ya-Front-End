import axios from "axios"
import { config } from "../config/env"

const axiosService = axios.create({
    baseURL: "http://localhost:3001", // Base URL from your env config
    headers: {
        "Content-Type": "application/json",
    },
})

// Flag to prevent multiple refresh attempts
let isRefreshing = false
let failedQueue: Array<{
    resolve: (value?: any) => void
    reject: (reason?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error)
        } else {
            resolve(token)
        }
    })

    failedQueue = []
}

// Interceptor para agregar el token a cada request
axiosService.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token")

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// Interceptor para manejar respuestas y errores 401/403
axiosService.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        // Si es error 401 y no hemos intentado refrescar el token
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Si ya estamos refrescando, agregar a la cola
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`
                        return axiosService(originalRequest)
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const refreshToken = localStorage.getItem("refresh_token")
                if (!refreshToken) {
                    throw new Error("No refresh token available")
                }

                console.log("Attempting to refresh token...")

                // Send refresh token in request body, not headers
                const response = await axios.post(config.urls.refreshAccessToken, {
                    refreshToken: refreshToken,
                })

                const { accessToken, refreshToken: newRefreshToken } = response.data

                // Guardar los nuevos tokens
                localStorage.setItem("access_token", accessToken)
                if (newRefreshToken) {
                    localStorage.setItem("refresh_token", newRefreshToken)
                }

                console.log("Token refreshed successfully")

                // Process the queue with the new token
                processQueue(null, accessToken)

                // Reintentar la petición original con el nuevo token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`
                return axiosService(originalRequest)
            } catch (refreshError: any) {
                console.error("Token refresh failed:", refreshError)

                // Process the queue with error
                processQueue(refreshError, null)

                // Si falla el refresh, limpiar tokens y redirigir al login
                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")

                // Only redirect if we're not already on login page
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login"
                }

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        // Si es error 403, el usuario no tiene permisos
        if (error.response?.status === 403) {
            console.error("Acceso denegado: No tienes permisos para realizar esta acción")
        }

        return Promise.reject(error)
    },
)

export { axiosService }
