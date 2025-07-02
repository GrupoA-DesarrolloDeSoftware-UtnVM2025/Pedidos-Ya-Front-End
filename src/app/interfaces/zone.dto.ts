import {LocationDto} from './location.dto';

export interface ZoneResponse {
  id: number
  name: string
  location: LocationDto
  radius: number
}
