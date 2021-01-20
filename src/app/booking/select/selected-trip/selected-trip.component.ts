import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchForm } from 'src/app/models/app-models/search-form';
import { SelectedTrip } from 'src/app/models/app-models/selected-trip';
import { Trip } from 'src/app/models/common/trip';
import { SearchResponse } from 'src/app/models/responses/search-response';
import { DatabaseHandlerService } from 'src/app/services/database-handler.service';
import { BookingRequest } from 'src/app/shared/models/requests/booking-request';
import { BookingResponse } from 'src/app/shared/models/responses/booking-response';
import * as fromApp from 'src/app/store/app.reducer';
import * as BookingActions from 'src/app/store/booking-store/booking.actions';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-selected-trip',
  templateUrl: './selected-trip.component.html',
  styleUrls: ['./selected-trip.component.css'],
})
export class SelectedTripComponent implements OnInit {
  @Input() selectedTrips: SelectedTrip[];
  @Input() searchResponse: SearchResponse;
  @Input() passengerCount: number;
  @Input() vehicleCount: number;
  @Input() readyForCalculation: boolean;
  @Input() searchForm: SearchForm;
  @Input() readyForInfo: boolean;
  @Output() pricingResponseEvent  = new EventEmitter();
  errorMessage: string;
  pricingRequest: BookingRequest;
  pricingResponse: BookingResponse;
  prices: number[] = [];
  accomodationPrices: any[] = [];
  totalPrice: number;
  isLoading = false;
  isInfoEnabled = false;

  constructor(
    private databaseHandlerService: DatabaseHandlerService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {}

  submit() {
    this.isInfoEnabled = true;
    const searchForm: SearchForm = {
      ...this.searchForm,
      passengerCount: this.passengerCount,
      vehicleCount: this.vehicleCount,
    };
    this.store.dispatch(
      new BookingActions.UpdateSelectPhaseModel({
        pricingResponse: this.pricingResponse,
        selectedTrips: cloneDeep(this.selectedTrips),
        pricingRequest: this.pricingRequest,
        searchForm: searchForm,
        prices: this.prices,
        totalPrice: this.totalPrice
      })
    );
  }

  calculatePrice() {
    this.errorMessage = null;
    this.pricingRequest = new BookingRequest();
    this.pricingRequest.pricingConstructor(
      this.searchResponse,
      this.selectedTrips
    );
    console.log('Pricing Request', this.pricingRequest);
    this.isLoading = true;
    if(this.isInfoEnabled) this.resetBookingPhase();
    this.databaseHandlerService.pricingRequest(this.pricingRequest).subscribe(
      (response) => {
        console.log('Pricing Response', response);
        if (response.message){
          this.errorMessage = response.message;
        } else {
          this.pricingResponse = response;
          this.calculate();
          this.handleIsCustomerReadyForInfo(true);
        }
        this.isLoading = false;
      },
      (errorRes) => {
        this.isLoading = false;
        this.errorMessage = errorRes;
      }
    );
  }

  calculate() {
    this.accomodationPrices = [];
    this.pricingResponse.trips.forEach((trip) => {
      const prices = [];
      trip.prices.forEach((price) => prices.push(price.total));
      this.accomodationPrices.push(prices);
    });
    this.prices = [];
    this.pricingResponse.trips.forEach((trip) => {
      this.prices.push(
        trip.prices.reduce(
          (previous, current) => previous + current.total,
          0
        )
      );
    });
    this.totalPrice = this.prices.reduce(
      (previous, current) => previous + current,
      0
    );
  }

  handleIsCustomerReadyForInfo(isReadyForInfo: boolean){
    this.pricingResponseEvent.emit(isReadyForInfo);
  }

  resetBookingPhase() {
    this.store.dispatch(new BookingActions.ResetBookingPhasesParams({
      isSelectEnabled : true,
      isInfoEnabled: false,
      isPaymentEnabled: false
    }));
    this.isInfoEnabled = false;
  }

  getTrip(i: number): Trip {
    const tripIndex = this.selectedTrips[i].tripIndexInSearchResponse;
    return tripIndex === null
      ? null
      : this.searchResponse.tripsWithDictionary[i].trips[tripIndex];
  }

  getPassengerPrice(i: number, passengerIndex: number): number{
    if (this.accomodationPrices[i] && this.accomodationPrices[i][passengerIndex] ){
      return this.accomodationPrices[i][passengerIndex] / 100;
    }
    return 0;
  }
}
