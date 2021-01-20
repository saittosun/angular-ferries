import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs/operators';
import { Route, SearchForm } from 'src/app/models/app-models/search-form';
import { Location } from 'src/app/models/common/location';
import { BookingService } from 'src/app/services/booking.service';
import { DatabaseHandlerService } from 'src/app/services/database-handler.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as BookingActions from 'src/app/store/booking-store/booking.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm: SearchForm;
  isLoading = false;
  isSubmitted = false;
  origins: Location[];
  errorMessage: string;

  constructor(
    private databaseHandlerService: DatabaseHandlerService,
    private bookingService: BookingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.searchForm = new SearchForm();
    this.searchForm.routes.push(new Route());
    this.searchForm.routes = [...Array(1).fill(new Route())];
    if (!this.bookingService.routeDictionary.length) {
      this.bookingService.setLocations().subscribe(origins => {
        this.origins = origins;
      });
    } else {
      this.origins = [...this.bookingService.getOrigins()];
    }
  }

  submit() {
    this.isSubmitted = true;
    if (!this.isFormValid()) return;
    this.store.dispatch(new BookingActions.ResetBookingPhasesParams({
      isSelectEnabled : false,
      isInfoEnabled: false,
      isPaymentEnabled: false
    }));
    this.isLoading = true;
    this.databaseHandlerService.postSearchRequest(this.searchForm).subscribe(
      searchResponse => {
        console.log(this.searchForm);
        this.isLoading = false;
        this.store.dispatch(new BookingActions.UpdateSearchPhaseModel({
          searchForm: {...this.searchForm},
          searchResponse: {...searchResponse}
        }));
      },
      errorRes => {
        this.isLoading = false;
        return this.errorMessage = errorRes}
    );
    this.bookingService.setRouteDateAlternatives(this.searchForm)
  }

  isFormValid(): boolean {
    let isFormValid = true;
    if ( this.searchForm.tripCount == 1 &&
        this.searchForm.routes[0].origin &&
        this.searchForm.routes[0].destination &&
        this.searchForm.routes[0].date &&
        this.searchForm.routes[1].date ){
      this.searchForm.routes[1].origin = this.searchForm.routes[0].destination;
      this.searchForm.routes[1].destination = this.searchForm.routes[0].origin;
    } else {
      this.searchForm.routes.forEach(
        (route) => (isFormValid = route.origin && route.destination && route.date ? true : false)
      );
    }
    return isFormValid;
  }

  changeTripKind = (kind: number) => {
    const diff = kind - this.searchForm.tripCount;
    for (let i = 0; i < Math.abs(diff); i++) {
      diff < 0
        ? this.searchForm.routes.pop()
        : this.searchForm.routes.push(new Route());
    }
    this.searchForm.tripCount = kind;
    this.isSubmitted = false;
    this.searchForm = Object.assign({}, this.searchForm);
  };

  changeCounts = (counts) => {
    this.searchForm.passengerCount = counts.passengerCount;
    this.searchForm.vehicleCount = counts.vehicleCount;
  };

  changeRoutes(route) {
    this.searchForm.routes[route.index].origin = route.origin;
    this.searchForm.routes[route.index].destination = route.destination;
    this.searchForm = Object.assign({}, this.searchForm);
  }

  changeDates(route) {
    this.searchForm.routes[route.index].date = route.date;
    this.searchForm = Object.assign({}, this.searchForm);
    console.log('parent', this.searchForm);
  }
}
