import * as fromBookingModel from './booking-store/booking.reducer';
import * as fromAuth from './auth-store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    bookingModel: fromBookingModel.State,
    auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
    auth : fromAuth.authReducer,
    bookingModel: fromBookingModel.bookingModelReducer
};