/*contiene todas las estructuras de datos relacionadas con el módulo o entidad Delivery.*/
import {LocationDto} from './location.dto';
import {ZoneResponse} from './zone.dto';

//Se usa para crear una entrega. (envia a backend con personId,location,radius)
export interface CreateDeliveryDto {
  personId: number
  location: LocationDto
  radius: number
}

//Se usa para recibir la respuesta del backend luego de crear o consultar una entrega.
//incluye(id, status, zones)
export interface DeliveryResponse {
  id: number
  personId: number
  location: LocationDto
  radius: number
  status: string
  zones: ZoneResponse[]
}

//Se usa para mostrar una entrega en la UI
//Tiene los datos desglosados(latitud y longitud- nombrezona-zones)
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
//Se usa para mostrar una lista paginada de entregas.
export interface PaginatedDeliveryResponse {
  data: DeliveryDisplayItem[]
  total: number
  limit: number
  offset: number
  totalPages: number
  currentPage: number
}
//Se usa para actualizar la ubicación de una entrega específica.
//solo location
export interface UpdateDeliveryLocationDto {
  location: LocationDto
}

//Se usa para actualizar el estado de la entrega 
export interface UpdateDeliveryStatusDto {
  status: string
}
