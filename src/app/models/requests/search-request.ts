import { SearchForm } from '../app-models/search-form';
import { Sorting } from '../enums/sorting.enum';

export class TimeTableRequest {
  departureDate: string; //  The format is YYYY-MM-DD.
  // departureTime: string; //Optional. The hour of date, to search. Possible values are 0 to 23.
  originIdOrCode: string; //The abbreviation of the origin’s location (Location#idOrCode).
  destinationIdOrCode: string; // The abbreviation of the destination’s location (Location#idOrCode).
  sorting: string; //Sets the sorting type of results. Possible values are: BY_DEPARTURE_TIME, BY_ARRIVAL_TIME, BY_FASTEST_ROUTE.
  availabilityInformation: boolean; //Optional. Used, only, in doTrips method. Indicates on whether availability data and route analysis, is to be fetched. Valid values are 0 to 9.
  quoteRequest: {
    passengers: number;
    vehicles: number;
  };

  constructor(searchForm: SearchForm, index: number) {
    this.departureDate = this.getTrueDate(searchForm.routes[index].date);
    this.originIdOrCode = searchForm.routes[index].origin.idOrCode;
    this.destinationIdOrCode = searchForm.routes[index].destination.idOrCode;
    this.sorting = Sorting.BY_DEPARTURE_TIME;
    this.availabilityInformation = true;
    this.quoteRequest = {
      passengers: searchForm.passengerCount,
      vehicles: searchForm.vehicleCount
    }
  }

  // date property is one day earliear. With this method, we set the date to real date (day+1).
  getTrueDate(date: Date){
    var realDate = new Date(new Date(date).getTime());
    return realDate.toLocaleDateString("fr-CA");
  }
}
