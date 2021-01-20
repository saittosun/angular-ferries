import { Country } from './country';

export class Location {
  idOrCode: string; //The location’s id or code.
  name: string; // The location’s name.
  country: Country;
  // locationType: string; // The location’s type. Possible values are HARBOUR, GENERIC_LOCATION, BUS_STOP etc.
  // latitude: number;
  // longitude: number; //The location’s longitude.
  // areas: Area[];
}
