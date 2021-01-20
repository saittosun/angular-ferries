import { PassengerType } from './passenger-type';
import { VesselDictionary } from './vessel-dictionary';
import { Accommodation } from './accommodation';
import { Discount } from './discount';
import { Vessel } from './vessel';

export class CompanyDictionary {
  name: string;
  imageUrl: string;
  vehicleAccommodations: Accommodation [] = [];
  // accommodations: AccommodationDictionary;
  vehicleDiscounts: Discount [] = [];
  // fareCodes: {[key: string]: Fare}[];
  passengerTypes: PassengerType [] = [];
  vesselDictionary: VesselDictionary;
  paymentFlowId: number;

  constructor(vessel: Vessel, companies: any){
    const dictionary = companies[vessel.company.abbreviation];
    if (dictionary){
      this.name = dictionary.name;
      this.imageUrl = dictionary.imageUrl;
      for (const [key, value] of Object.entries(dictionary.accommodations.vehicles)) {
        const accomodation = new Accommodation();
        accomodation.initilaizeForVehicle(key, value);
        this.vehicleAccommodations.push(accomodation);
      }
      const defaultDiscount = new Discount();
      defaultDiscount.name = "NO DISCOUNT";
      this.vehicleDiscounts.push(defaultDiscount);
      for (const [key, value] of Object.entries(dictionary.discounts.vehicles)) {
        const discount = new Discount();
        discount.initilaize(key, value);
        this.vehicleDiscounts.push(discount);
      }
      for (const [key, value] of Object.entries(dictionary.passengerTypes)) {
        this.passengerTypes.push(new PassengerType(key, value));
      }
      this.vesselDictionary = new VesselDictionary(dictionary.vessels[vessel.idOrCode]);
      this.paymentFlowId = dictionary.paymentFlowId;
    }
  }
}
