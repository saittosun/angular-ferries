import { Accommodation } from '../common/accommodation';
import { AccommodationAvailability } from '../common/accommodation-availability';
import { Discount } from '../common/discount';
import { PassengerType } from '../common/passenger-type';
import { environment } from 'src/environments/environment';
import { Gender } from '../enums/gender.enum';
import { Trip } from '../common/trip';

export class SelectedTrip {
  tripIndexInSearchResponse: number; // Points which trip is selected from searchRespose. Index shows tripsWithDictionary index.
  passengers: PassengerDetail [] = [];
  vehicles: VehicleDetail [] = [];

  constructor (passengerCount: number, vehicleCount: number, trip: Trip){
    for (let i=0 ; i<passengerCount ; i++){
      this.passengers.push(new PassengerDetail(trip));
    }
    for (let i=0 ; i<vehicleCount ; i++){
      this.vehicles.push(new VehicleDetail(trip));
    }
  }
}

export class PassengerDetail {
  availability: AccommodationAvailability;
  gender: Gender = environment.GENDERS[0];
  passengerDiscount: Discount;
  needsMandatoryData: boolean;
  needsMandatoryLoyaltyCard: boolean;
  passengerType: PassengerType;

  constructor(trip: Trip){
    if (trip){
      this.availability = trip.accommodationAvailabilities[0];
      this.passengerDiscount = trip.companyDictionary.passengerTypes[0].discounts[0];
      this.passengerType = trip.companyDictionary.passengerTypes[0];
    }
  }
}

export class VehicleDetail{
  vehicleDiscount: Discount;
  needsMandatoryData: boolean;
  needsMandatoryLoyaltyCard: boolean;
  vehicleLength: number;
  vehicleType: Accommodation;

  constructor(trip: Trip){
    if (trip){
      this.vehicleDiscount = trip.companyDictionary.vehicleDiscounts[0];
    }
  }
}
