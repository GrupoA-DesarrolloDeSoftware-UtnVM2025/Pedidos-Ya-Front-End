import {LocationDto} from './location.dto';
import {ZoneResponse} from './zone.dto';

export interface CreateDeliveryDto {
  personId: number
  location: LocationDto
  radius: number
}

export interface DeliveryResponse {
  id: number
  personId: number
  location: LocationDto
  radius: number
  status: string
  zones: ZoneResponse[]
}

export interface DeliveryDisplayItem {
  id: number
  personId: number
  latitude: number
  longitude: number
  radius: number
  status: string
  nombreZona: string
  zones: ZoneResponse[]
}
export interface PaginatedDeliveryResponse {
  data: DeliveryDisplayItem[]
  total: number
  limit: number
  offset: number
  totalPages: number
  currentPage: number
}

export interface UpdateDeliveryLocationDto {
  location: LocationDto
}

export interface UpdateDeliveryStatusDto {
  status: string
}
