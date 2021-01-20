import { Accommodation } from './accommodation';
import { AvailabilityType } from '../enums/availability-type.enum';

export class AccommodationAvailability {
  accommodation: Accommodation;
  availabilityType: AvailabilityType;
  // specificType: SpecificType;
  adultBasePrice: number;
  wholeBerthAvailability: number;
  maleBerthAvailability: number;
  femaleBerthAvailability: number;
  // priceList1: string;
  // priceList2: string;
  // passengerType: PassengerType;

  constructor (availability: AccommodationAvailability, accomodation: Accommodation){
    this.accommodation = new Accommodation();
    this.accommodation.initilaizeForPassenger(availability.accommodation, accomodation);
    this.availabilityType = availability.availabilityType;
    this.adultBasePrice = availability.adultBasePrice;
    this.wholeBerthAvailability = availability.wholeBerthAvailability;
    this.maleBerthAvailability = availability.maleBerthAvailability;
    this.femaleBerthAvailability = availability.femaleBerthAvailability;
  }
}
