import { InformationForm } from 'src/app/models/app-models/information-form';
import { SelectedTrip as SelectedTrip } from 'src/app/models/app-models/selected-trip';
import { BookingRequest } from 'src/app/shared/models/requests/booking-request';
import { BookingResponse } from '../responses/booking-response';
import { SearchParams } from './search-parameter';

export class BookingModel {
  bookingPhase: number = 0;
  isSearchSubmitted: boolean = false;
  isSelectSubmitted: boolean = false;
  isInfoSubmitted: boolean = false;
  searchParameter: SearchParams = new SearchParams(null);
  selectParameters: SelectParams = new SelectParams();
  infoParameters: InfoParams = new InfoParams();
  bookingRequest: BookingRequest;
}

export class InfoParams{
  informationForm: InformationForm = null;
}

export class SelectParams{
  accodomotionTypeIndex: string[][][] = [];
  isOptionSelected: boolean [][] = [];
  readyForCalculation: boolean = false;
  readyForBooking: boolean = false;
  pricingResponse: BookingResponse;
  selectedTrips: SelectedTrip [] = [];
  prices: number [] = [];
  accomodationPrices: any [] = [];
  totalPrice:number;
}
