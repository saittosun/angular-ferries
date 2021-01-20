import { Action } from '@ngrx/store';
import { InformationForm } from 'src/app/models/app-models/information-form';
import { SelectedTrip } from 'src/app/models/app-models/selected-trip';

import { SearchResponse } from 'src/app/models/responses/search-response';
import { BookingRequest } from 'src/app/shared/models/requests/booking-request';
import { BookingResponse } from 'src/app/shared/models/responses/booking-response';
import { SearchForm } from '../../models/app-models/search-form';

export const UPDATE_SEARCH_PHASE_MODEL = 'UPDATE_SEARCH_FORM';
export const UPDATE_SELECT_PHASE_MODEL = 'UPDATE_SEARCH_REQUEST';
export const UPDATE_INFO_PHASE_MODEL = 'UPDATE_INFO_PHASE_MODEL';
export const CHANGE_BOOKING_PHASE = 'CHANGE_BOOKING_PHASE';
export const RESET_BOOKING_PHASES_PARAMS = 'RESET_BOOKING_PHASES_PARAMS';

export class ResetBookingPhasesParams implements Action {
  readonly type = RESET_BOOKING_PHASES_PARAMS;
  constructor(
    public payload: {
      isSelectEnabled: boolean,
      isInfoEnabled: boolean,
      isPaymentEnabled: boolean
    }
  ) {}
}

export class UpdateSearchPhaseModel implements Action {
  readonly type = UPDATE_SEARCH_PHASE_MODEL;
  constructor(
    public payload: {
      searchForm: SearchForm;
      searchResponse: SearchResponse;
    }
  ) {}
}

export class UpdateSelectPhaseModel implements Action {
  readonly type = UPDATE_SELECT_PHASE_MODEL;
  constructor(
    public payload: {
      selectedTrips: SelectedTrip[],
      pricingResponse: BookingResponse,
      pricingRequest: BookingRequest,
      searchForm: SearchForm,
      prices: number[];
      totalPrice: number;
    }
  ) {}
}

export class UpdateInfoPhaseModel implements Action {
  readonly type = UPDATE_INFO_PHASE_MODEL;
  constructor(
    public payload: {
      bookingRequest: BookingRequest,
      informationForm: InformationForm
    }
  ) {}
}

export class ChangeBookingPhase implements Action {
  readonly type = CHANGE_BOOKING_PHASE;
  constructor(public payload: number) {}
}

export type Actions =
  | UpdateSearchPhaseModel
  | UpdateSelectPhaseModel
  | ChangeBookingPhase
  | ResetBookingPhasesParams
  | UpdateInfoPhaseModel;
