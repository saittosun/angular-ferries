import { Accommodation } from './accommodation';

export class AccommodationDictionary {
  passengers: {[key: string]: Accommodation}[];
  vehicles: {[key: string]: Accommodation}[];
}
