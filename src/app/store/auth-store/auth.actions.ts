import { Action } from '@ngrx/store';
import { User } from 'src/app/models/app-models/user';

export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const LOGOUT = 'LOGOUT';
export const L0GIN_START = 'LIGIN_START';
export const AUTHENTICATE_FAIL = 'LOGIN_FAIL';
export const SET_BOOKING_PARAMETERS = 'SET_BOOKING_PARAMETERS';
export const SET_ALL_USERS = 'SET_ALL_USERS';
export const SET_ALL_BOOKINGS = 'SET_ALL_BOOKINGS';
export const UPDATE_BOOKING_MAP = 'UPDATE_BOOKING_MAP';

export class Authenticate implements Action {
  readonly type = AUTHENTICATE;
  constructor(public payload: User) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class LoginStart implements Action {
  readonly type = L0GIN_START;
  constructor(
    public payload: { email: string; password: string; rememberMe: boolean }
  ) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AddBookingParameters implements Action {
  readonly type = SET_BOOKING_PARAMETERS;
  constructor(public payload: { email: string; bookingId: number }) {}
}

export class AddAllUsers implements Action {
  readonly type = SET_ALL_USERS;
  constructor(public payload: any[]) {}
}

export class AddAllBookings implements Action {
  readonly type = SET_ALL_BOOKINGS;
  constructor(public payload: any[]) {}
}

export class UpdateBookingsMap implements Action {
  readonly type = UPDATE_BOOKING_MAP;
  constructor(public payload: { number: number; object: Object }) {}
}

export type Actions =
  | UpdateBookingsMap
  | AddBookingParameters
  | Authenticate
  | Logout
  | AddAllUsers
  | AddAllBookings
  | AuthenticateFail
  | LoginStart
  | AutoLogin;
