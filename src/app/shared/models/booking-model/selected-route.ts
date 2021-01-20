import { Location } from '../../../models/common/location';

export class SelectedRoute {
  origin: Location;
  destination: Location;
  date: Date;

  constructor(origin: Location, destination: Location, date: Date){
    this.origin = origin;
    this.destination = destination;
    this.date = date;
  }
}
