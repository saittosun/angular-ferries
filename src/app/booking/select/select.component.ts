import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RouteDateAlternative } from 'src/app/models/app-models/rout-date-alternative';
import { SearchForm } from 'src/app/models/app-models/search-form';
import { PassengerDetail, SelectedTrip, VehicleDetail } from 'src/app/models/app-models/selected-trip';
import { Trip } from 'src/app/models/common/trip';
import { Gender } from 'src/app/models/enums/gender.enum';
import { SearchResponse } from 'src/app/models/responses/search-response';
import { BookingService } from 'src/app/services/booking.service';
import { DatabaseHandlerService } from 'src/app/services/database-handler.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as BookingActions from 'src/app/store/booking-store/booking.actions';
import * as cloneDeep from 'lodash/cloneDeep';
import { AlertComponent, AlertData } from 'src/app/shared/base-components/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  searchResponse: SearchResponse;
  searchForm: SearchForm;
  selectedTrips: SelectedTrip[] = [];
  customersAllselectedTrips: SelectedTrip[][] = [];
  passengerCount: number;
  vehicleCount: number;
  tripCount: number; // begins from 0, 0->one way, 1->round ...
  genders: Gender[] = environment.GENDERS;
  selectedGenders: Gender[];
  isSubmitted: boolean [][] = [];
  isDictionaryVisiable: boolean[];
  isTripVisible: boolean[][];
  readyForCalculation: boolean = false;
  readyForInfo: boolean = false;
  routeDateAlternatives: RouteDateAlternative [];
  errorMessage: string;
  isLoading = false;

  constructor(
    private databaseHandlerService: DatabaseHandlerService,
    private bookingService: BookingService,
    private store: Store<fromApp.AppState>,
    public alertDialog: MatDialog
  ) {}

  ngOnInit() {
    this.store
      .select('bookingModel')
      .pipe(
        map((bookigState) => {
          return {
            searchPhaseModel: bookigState.searchPhaseModel,
            selectPhaseModel: bookigState.selectPhaseModel,
          };
        })
      )
      .subscribe((state) => {
        this.passengerCount = state.searchPhaseModel.searchForm.passengerCount;
        this.vehicleCount = state.searchPhaseModel.searchForm.vehicleCount;
        this.tripCount = state.searchPhaseModel.searchForm.routes.length;
        this.searchResponse = state.searchPhaseModel.searchResponse;
        this.searchForm = cloneDeep(state.searchPhaseModel.searchForm);
      }).unsubscribe();
    this.isTripVisible = new Array(this.tripCount);
    for (let i=0 ; i<this.tripCount ; i++) {
      const trips = this.searchResponse.tripsWithDictionary[i].trips;
      this.isSubmitted.push(new Array(trips.length).fill(false));
      this.isTripVisible[i] = new Array(trips.length).fill(false);
      this.selectedTrips.push(new SelectedTrip(this.passengerCount, this.vehicleCount, null));
      const tempArray:SelectedTrip[] = [];
      for (let j=0 ; j<trips.length ; j++){
        tempArray.push(new SelectedTrip(this.passengerCount, this.vehicleCount, trips[j]));
      }
      this.customersAllselectedTrips.push(tempArray);
    }
    this.selectedGenders = new Array(this.passengerCount).fill(environment.GENDERS[0]);
    this.isDictionaryVisiable = new Array(this.tripCount).fill(false);
    this.routeDateAlternatives = this.bookingService.routeDateAlternatives;
  }

  select(dicIndex: number, tripIndex: number){
    this.readyForInfo = false;
    this.isSubmitted[dicIndex][tripIndex] = true;
    for (let i=0 ; i<this.vehicleCount ; i++){
      if(!this.customersAllselectedTrips[dicIndex][tripIndex].vehicles[i].vehicleType) return;
      if(!this.customersAllselectedTrips[dicIndex][tripIndex].vehicles[i].vehicleLength) return;
    }
    this.selectedTrips[dicIndex] = {...this.customersAllselectedTrips[dicIndex][tripIndex]};
    this.selectedTrips[dicIndex].tripIndexInSearchResponse = tripIndex;
    this.readyForCalculation = this.selectedTrips.filter(trip => trip.tripIndexInSearchResponse !== null).length === this.tripCount;
  }

  handleNewDateSearch(dicIndex: number, direction: boolean){
    const milis = direction ? this.routeDateAlternatives[dicIndex].nextDate : this.routeDateAlternatives[dicIndex].previousDate;
    if (!milis) return;
    this.searchForm.passengerCount = this.passengerCount;
    this.searchForm.vehicleCount = this.vehicleCount;
    this.searchForm.routes[dicIndex].date = new Date(milis);
    this.isLoading = true;
    this.databaseHandlerService.postSearchRequest(this.searchForm).subscribe(
      (searchResponse) => {
        this.store.dispatch(new BookingActions.UpdateSearchPhaseModel({
          searchForm: this.searchForm,
          searchResponse: searchResponse
        }));
      },
      catchError((errorRes) => (this.errorMessage = errorRes))
    );
    this.bookingService.setRouteDateAlternatives(this.searchForm)
  }

  handleVehicleChange(obj: { dicIndex: string | number; tripIndex: string | number; vehicleDetails: VehicleDetail[]; }){
    this.customersAllselectedTrips[obj.dicIndex][obj.tripIndex].vehicles = obj.vehicleDetails;
  }

  handleGenderChange(obj: { index: string | number; gender: Gender; }){
    for (let i=0 ; i<this.tripCount ; i++){
      for (let j=0 ; j<this.searchResponse.tripsWithDictionary[i].trips.length ; j++){
        this.customersAllselectedTrips[i][j].passengers[obj.index].gender = obj.gender;
      }
    }
  }

  handlePassengerDiscountChange(obj: { passengerDiscount: any; index: any; dicIndex: any; tripIndex: any; }){
    const passengerDiscount = obj.passengerDiscount;
    const passengerIndex = obj.index;
    const dicIndex = obj.dicIndex;
    const tripIndex = obj.tripIndex;
    this.customersAllselectedTrips[dicIndex][tripIndex].passengers[passengerIndex].passengerDiscount = passengerDiscount;
  }

  handlePassengerTypeChange(obj: { passengerType: any; passengerIndex: any; dicIndex: any; tripIndex: any; }){
    const passengerType = obj.passengerType;
    const passengerIndex = obj.passengerIndex;
    const dicIndex = obj.dicIndex;
    const tripIndex = obj.tripIndex;
    this.customersAllselectedTrips[dicIndex][tripIndex].passengers[passengerIndex].passengerType = passengerType;
  }

  handleAccommodationChange(obj: { selectedAccommodationAvailabilities: any; dicIndex: any; tripIndex: any; }){
    const selectedAccommodationAvailabilities = obj.selectedAccommodationAvailabilities;
    const dicIndex = obj.dicIndex;
    const tripIndex = obj.tripIndex;
    for (let i=0 ; i<this.passengerCount ; i++){
        this.customersAllselectedTrips[dicIndex][tripIndex].passengers[i].availability = selectedAccommodationAvailabilities[i];
    }
  }

  toggleDictionary(dicIndex: number){
    this.isDictionaryVisiable[dicIndex] = !this.isDictionaryVisiable[dicIndex];
  }

  toggleTrip(dicIndex: number, tripIndex: number){
    const status: boolean = this.isTripVisible[dicIndex][tripIndex];
    this.isTripVisible[dicIndex] = new Array(this.isTripVisible[dicIndex].length).fill(false);
    this.isTripVisible[dicIndex][tripIndex] = !status;
  }

  changeCustomerAllTrips (action: string){
    for (let i=0 ; i<this.tripCount ; i++) {
      const trips = this.searchResponse.tripsWithDictionary[i].trips;
      for (let j=0 ; j<trips.length ; j++){
        const trip = this.searchResponse.tripsWithDictionary[i].trips[j];
        switch (action){
          case environment.ADD_VEHICLE :
            this.customersAllselectedTrips[i][j].vehicles.push(new VehicleDetail(trip));
            break;
          case environment.REMOVE_VEHICLE :
            this.customersAllselectedTrips[i][j].vehicles.pop();
            break;
          case environment.ADD_PASSENGER :
            this.customersAllselectedTrips[i][j].passengers.push(new PassengerDetail(trip));
            break;
          default :
            this.customersAllselectedTrips[i][j].passengers.pop();
        }
      }
    }
  }

  changeReadyForInfo(readyForInfo: boolean){
    this.readyForInfo = readyForInfo;
  }

  getDurationTime(dicIndex, tripIndex){
    const duration: number = this.searchResponse.tripsWithDictionary[dicIndex].trips[tripIndex].duration;
    return duration%60 ===0 ? Math.ceil(duration/60) + 'h' : Math.ceil(duration/60) + 'h ' + duration%60 + 'm';
  }

  hasVesselCabin(dicIndex, tripIndex): boolean{
    const trip: Trip = this.searchResponse.tripsWithDictionary[dicIndex].trips[tripIndex];
    return trip.vessel.hasCabins && trip.accommodationAvailabilities.length > 0;
  }

  hasVesselGarage(dicIndex, tripIndex){
    const trip: Trip = this.searchResponse.tripsWithDictionary[dicIndex].trips[tripIndex];
    return trip.vessel.hasGarage && trip.accommodationAvailabilities.length > 0;
  }

  hasAccommodation(dicIndex, tripIndex){
    const trip: Trip = this.searchResponse.tripsWithDictionary[dicIndex].trips[tripIndex];
    return trip.accommodationAvailabilities.length > 0;
  }

  isTripSelected(dicIndex, tripIndex): boolean{
    return this.selectedTrips[dicIndex].tripIndexInSearchResponse === tripIndex;
  }

  addPassenger(i: number){
    if (i > 0 && this.passengerCount === environment.MAX_PASSENGER_COUNT){
      this.openAlert({title: 'Not Allowed', text: ['You reached maximim passenger count.']});
      return;
    }
    if (i < 0 && this.passengerCount === environment.MIN_PASSENGER_COUNT){
      this.openAlert({title: 'Not Allowed', text: ['Passenger count must be bigger then 0.']});
      return;
    }
    this.passengerCount = this.passengerCount > 0 ? this.passengerCount + i : 1;
    i > 0 ? this.changeCustomerAllTrips(environment.ADD_PASSENGER) : this.changeCustomerAllTrips(environment.REMOVE_PASSENGER);
  }

  addVehicle(i: number){
    if (i > 0 && this.vehicleCount === environment.MAX_VEHICLE_COUNT){
      this.openAlert({title: 'Not Allowed', text: ['You reached maximim vehicle count.']});
      return;
    } else if (i < 0 && this.vehicleCount === environment.MIN_VEHICLE_COUNT) {
      return;
    } else if (i>0 && this.vehicleCount === this.passengerCount){
      this.openAlert({title: 'Not Allowed', text: ['Not enough passenger.', 'Please first add passenger.']});
      return;
    };
    this.vehicleCount = this.vehicleCount >= 0 ?  this.vehicleCount + i : 0;
    i > 0 ? this.changeCustomerAllTrips(environment.ADD_VEHICLE) : this.changeCustomerAllTrips(environment.REMOVE_VEHICLE);
  }

  openAlert(alertData: AlertData) {
    this.alertDialog.open(AlertComponent, {
      width: '400px',
      data:  alertData
    });
  }
}
