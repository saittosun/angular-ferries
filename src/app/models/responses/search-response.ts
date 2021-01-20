import { Trip } from '../common/trip';

export class SearchResponse{

  tripsWithDictionary: TripsWithDictionary[] = [];

  constructor(response){
    if (response.tripsWithDictionary){
      for (let dictionary of response.tripsWithDictionary){
        this.tripsWithDictionary.push(new TripsWithDictionary(dictionary));
      }
    }
  }
}

export class TripsWithDictionary {
  code: string;
  message: string;
  severeError: string;
  // locations: Location[];
  // companies: {[key: string]: CompanyDictionary}[];
  trips: Trip [] = [];

  constructor(dictionary){
    this.code = dictionary.code;
    this.message = dictionary.message;
    this.severeError = dictionary.severeError;
    if (dictionary.trips){
      for (let trip of dictionary.trips){
        const tempTrip = new Trip();
        tempTrip.initilaize(trip, dictionary.companies, dictionary.locations);
        this.trips.push(tempTrip);
      }
    }
  }
}
