import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from 'src/app/store/app.reducer';
import * as BookingActions from 'src/app/store/booking-store/booking.actions';

@Component({
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  bookingModelSub: Subscription;
  bookingPhase = 0;
  isSelectEnabled: boolean;;
  isInfoEnabled: boolean;
  isPaymentEnabled: boolean;

  ngOnInit() {
    this.bookingModelSub = this.store.select('bookingModel')
      .pipe(
        map(bookingState=>{
          return {
            phase: bookingState.bookingPhase,
            isSelectEnabled: bookingState.selectPhaseModel.isSelectEnabled,
            isInfoEnabled: bookingState.infoPhaseModel.isInfoEnabled,
            isPaymentEnabled: bookingState.paymentPhaseModel.isPaymentEnabled
          }
        })
      ).subscribe(state => {
        this.bookingPhase = state.phase;
        this.isSelectEnabled = state.isSelectEnabled;
        this.isInfoEnabled = state.isInfoEnabled;
        this.isPaymentEnabled = state.isPaymentEnabled;
      });
  }



  changePhase(phase: number){
    this.store.dispatch(new BookingActions.ChangeBookingPhase(phase));
  }

  ngOnDestroy(): void {
    this.bookingModelSub.unsubscribe();
  }
}
