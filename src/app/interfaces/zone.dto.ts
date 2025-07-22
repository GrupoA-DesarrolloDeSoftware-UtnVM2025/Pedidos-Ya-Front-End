// DTO representa una zona geográfica con ubicación y radio.
import {LocationDto} from './location.dto';

export interface ZoneResponse {
  id: number
  name: string
  location: LocationDto
  radius: number
}
