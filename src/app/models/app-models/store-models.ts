import { InformationForm } from 'src/app/models/app-models/information-form';
import { BookingRequest } from 'src/app/shared/models/requests/booking-request';
import { BookingResponse } from 'src/app/shared/models/responses/booking-response';
import { TimeTableRequest } from '../requests/search-request';
import { SearchResponse } from '../responses/search-response';
import { SearchForm } from './search-form';
import { SelectedTrip } from './selected-trip';

export class SearchPhaseModel {
    searchForm: SearchForm = new SearchForm();
    searchResponse: SearchResponse;
}

export class SelectPhaseModel {
  isSelectEnabled: boolean = false;
  selectedTrips: SelectedTrip [];
  pricingResponse: BookingResponse;
  pricingRequest: BookingRequest;
  prices: number[];
  totalPrice: number;
}

export class InfoPhaseModel {
  isInfoEnabled: boolean = false;
  bookingRequest: BookingRequest;
  informationForm: InformationForm;
}

export class PaymentPhaseModel {
  isPaymentEnabled: boolean = false;
}
