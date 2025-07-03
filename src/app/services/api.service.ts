import { Injectable } from "@angular/core"
import { axiosService } from "./axios.service"
import { config } from "../config/env"
import {
  CreateDeliveryDto,
  DeliveryDisplayItem,
  DeliveryResponse,
  PaginatedDeliveryResponse, UpdateDeliveryLocationDto, UpdateDeliveryStatusDto
} from '../interfaces/delivery.dto';


export interface PaginationDto {
  limit?: number
  offset?: number
}

export interface ApiDeliveriesResponse {
  deliveries: DeliveryResponse[]
  total: number
}

@Injectable({
  providedIn: "root",
})
export class DeliveryService {
  constructor() {}

  async getDeliveries(pagination: PaginationDto = {}): Promise<PaginatedDeliveryResponse> {
    try {
      const { limit = 10, offset = 0 } = pagination

      const response = await axiosService.get<ApiDeliveriesResponse>(config.urls.getDelivery, {
        params: { limit, offset },
      })

      const { deliveries, total } = response.data


      const transformedDeliveries: DeliveryDisplayItem[] = deliveries.map((delivery) => ({
        id: delivery.id,
        personId: delivery.personId,
        latitude: delivery.location.latitude,
        longitude: delivery.location.longitude,
        radius: delivery.radius,
        status: delivery.status,
        nombreZona: delivery.zones.length > 0 ? delivery.zones.map((zone) => zone.name).join(", ") : "Sin zona",
        zones: delivery.zones,
      }))

      const totalPages = Math.max(1, Math.ceil(total / limit))
      const currentPage = Math.floor(offset / limit) + 1

      return {
        data: transformedDeliveries,
        total,
        limit,
        offset,
        totalPages,
        currentPage,
      }
    } catch (error: any) {
      console.error("Error al obtener deliveries:", error)
      throw new Error(error.response?.data?.message || "Error al cargar los deliveries")
    }
  }

  async getDeliveryById(id: number): Promise<DeliveryResponse> {
    try {
      const response = await axiosService.get<DeliveryResponse>(config.urls.getDeliveryById(id))
      return response.data
    } catch (error: any) {
      console.error("Error al obtener delivery:", error)
      throw new Error(error.response?.data?.message || "Error al cargar el delivery")
    }
  }

  async createDelivery(deliveryData: CreateDeliveryDto): Promise<DeliveryResponse> {
    try {
      const response = await axiosService.post<DeliveryResponse>(config.urls.createDelivery, deliveryData)
      return response.data
    } catch (error: any) {

      if (error.response?.status === 400) {
        throw new Error(`Error de validación: ${error.response.data?.message || "Datos inválidos"}`)
      } else if (error.response?.status === 401) {
        throw new Error("No autorizado. Por favor, inicia sesión nuevamente.")
      } else if (error.response?.status === 403) {
        throw new Error("No tienes permisos para crear deliveries.")
      } else if (error.response?.status === 500) {
        throw new Error("Error interno del servidor. Intenta nuevamente.")
      } else if (!error.response) {
        throw new Error("Error de conexión. Verifica tu conexión a internet.")
      }

      throw new Error(error.response?.data?.message || "Error al crear el delivery")
    }
  }

  async deleteDelivery(id: number): Promise<void> {
    try {
      await axiosService.delete(config.urls.deleteDelivery(id))
    } catch (error: any) {
      console.error("Error al eliminar delivery:", error)
      throw new Error(error.response?.data?.message || "Error al eliminar el delivery")
    }
  }

  async updateLocation(id: number, locationData: UpdateDeliveryLocationDto): Promise<DeliveryResponse> {
    try {
      const response = await axiosService.put<DeliveryResponse>(config.urls.updateLocation(id), locationData)
      return response.data
    } catch (error: any) {
      console.error("Error al actualizar ubicación:", error)
      throw new Error(error.response?.data?.message || "Error al actualizar la ubicación")
    }
  }

  async updateStatus(id: number, statusData: UpdateDeliveryStatusDto): Promise<DeliveryResponse> {
    try {
      const response = await axiosService.put<DeliveryResponse>(config.urls.updateStatus(id), statusData)
      return response.data
    } catch (error: any) {
      console.error("Error al actualizar estado:", error)
      throw new Error(error.response?.data?.message || "Error al actualizar el estado")
    }
  }
}
