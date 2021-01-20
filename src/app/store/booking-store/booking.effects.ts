import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as BookingActions from 'src/app/store/booking-store/booking.actions';

@Injectable()
export class BookingEffects{
  constructor(private actions$: Actions, private router: Router){}

  @Effect({dispatch: false})
  bookingPageRouter = this.actions$.pipe(
    ofType(BookingActions.UPDATE_SEARCH_PHASE_MODEL),
    tap(() => this.router.navigate(['/booking']))
  );

  // @Effect({dispatch: false})
  // resetBookingParams = this.actions$.pipe(
  //   ofType(BookingActions.UPDATE_SEARCH_PHASE_MODEL),
  //   map(() => new BookingActions.ResetBookingPhasesParams({
  //     isSelectEnabled : false,
  //     isInfoEnabled: false,
  //     isPaymentEnabled: false
  //   }))
  // );
}
