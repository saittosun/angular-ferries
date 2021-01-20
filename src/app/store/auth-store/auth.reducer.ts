import * as AuthActions from './auth.actions';
import { User } from '../../models/app-models/user';

export interface State {
  user: User;
  allBookings;
  allUsers;
  bookingParams: { email: string; bookingId: number };
  bookingsMap: Map<number, Object>;
  authErrorMessage: string;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  allBookings: null,
  allUsers: null,
  bookingParams: null,
  bookingsMap: new Map(),
  authErrorMessage: null,
  isLoading: false,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.Actions
): State {
  switch (action.type) {
    case AuthActions.AUTHENTICATE:
      return {
        ...state,
        authErrorMessage: null,
        user: action.payload,
        isLoading: false,
      };

    case AuthActions.L0GIN_START:
      return { ...state, authErrorMessage: null, isLoading: true };

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authErrorMessage: action.payload,
        isLoading: false,
      };

    case AuthActions.LOGOUT:
      return { ...state, user: null };

    case AuthActions.SET_ALL_USERS:
      return { ...state, allUsers: action.payload };

    case AuthActions.SET_ALL_BOOKINGS:
      return { ...state, allBookings: action.payload };

    case AuthActions.SET_BOOKING_PARAMETERS:
      return {
        ...state,
        bookingParams: action.payload,
      };

    case AuthActions.UPDATE_BOOKING_MAP:
      const map = new Map(state.bookingsMap);
      map.set(action.payload.number, action.payload.object);
      return {
        ...state,
        bookingsMap: map,
      };

    default:
      return state;
  }
}
