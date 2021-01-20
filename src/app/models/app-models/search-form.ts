import { Location } from 'src/app/models/common/location';

export class SearchForm {
  tripCount: number = 0;
  passengerCount: number = 1;
  vehicleCount: number = 0;
  routes: Route [] = [];
}

export class Route {
  origin: Location;
  destination: Location;
  date: Date;

  getCode(){
    if (this.origin && this.destination){
      return this.origin.idOrCode + '-' + this.destination.idOrCode;
    }
    throw Error('Search form origin or destination is null. Check codes.')
  }
}
