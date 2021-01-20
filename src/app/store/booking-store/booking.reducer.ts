import * as BookingActions from './booking.actions';

import {
  InfoPhaseModel,
  PaymentPhaseModel,
  SearchPhaseModel,
  SelectPhaseModel,
} from 'src/app/models/app-models/store-models';

export interface State {
  bookingPhase: number;
  searchPhaseModel: SearchPhaseModel;
  selectPhaseModel: SelectPhaseModel;
  infoPhaseModel: InfoPhaseModel;
  paymentPhaseModel: PaymentPhaseModel;
}

const initialState: State = {
  bookingPhase: 0,
  searchPhaseModel: new SearchPhaseModel(),
  selectPhaseModel: new SelectPhaseModel(),
  infoPhaseModel: new InfoPhaseModel(),
  paymentPhaseModel: new PaymentPhaseModel(),
};

export function bookingModelReducer(
  state: State = initialState,
  action: BookingActions.Actions
): State {
  switch (action.type) {

    case BookingActions.RESET_BOOKING_PHASES_PARAMS:
      return {
        ...state,
        selectPhaseModel: {
          ...state.selectPhaseModel,
          isSelectEnabled: action.payload.isSelectEnabled,
        },
        infoPhaseModel: {
          ...state.infoPhaseModel,
          isInfoEnabled: action.payload.isInfoEnabled,
        },
        paymentPhaseModel: {
          ...state.paymentPhaseModel,
          isPaymentEnabled: action.payload.isPaymentEnabled,
        },
      };

    case BookingActions.CHANGE_BOOKING_PHASE:
      return { ...state, bookingPhase: action.payload };

    case BookingActions.UPDATE_SEARCH_PHASE_MODEL:
      return {
        ...state,
        searchPhaseModel: {
          ...state.searchPhaseModel,
          searchForm: action.payload.searchForm,
          searchResponse: action.payload.searchResponse,
        },
        selectPhaseModel: {
          ...state.selectPhaseModel,
          isSelectEnabled: true,
        },
        infoPhaseModel: {
          ...state.infoPhaseModel,
          isInfoEnabled: false,
        },
        paymentPhaseModel: {
          ...state.paymentPhaseModel,
          isPaymentEnabled: false,
        },
        bookingPhase: 1,
      };

      case BookingActions.UPDATE_SELECT_PHASE_MODEL:
        return {
          ...state,
          searchPhaseModel: {
            ...state.searchPhaseModel,
            searchForm: action.payload.searchForm
          },
          selectPhaseModel: {
            ...state.selectPhaseModel,
            prices: action.payload.prices,
            pricingRequest: action.payload.pricingRequest,
            pricingResponse: action.payload.pricingResponse,
            selectedTrips: action.payload.selectedTrips,
            totalPrice: action.payload.totalPrice
          },
          infoPhaseModel: {
            ...state.infoPhaseModel,
            isInfoEnabled: true
          },
          paymentPhaseModel: {
            ...state.paymentPhaseModel,
            isPaymentEnabled: false,
          },
          bookingPhase: 2,
        };

    case BookingActions.UPDATE_INFO_PHASE_MODEL:
      return {
        ...state,
        infoPhaseModel: {
          ...state.infoPhaseModel,
          isInfoEnabled: true,
          bookingRequest: action.payload.bookingRequest,
          informationForm: action.payload.informationForm,
        },
        paymentPhaseModel: {
          ...state.paymentPhaseModel,
          isPaymentEnabled: true,
        },
        bookingPhase: 3,
      };

    default:
      return state;
  }
}
