import { Discount } from './discount';
import { Price } from './price';
import { Ticket } from './ticket';
import { Accommodation } from './accommodation';
import { Action } from '../enums/action.enum';

export class Vehicle {
  priorityNumber: string; //The vehicle’s priority number, in garage.
  length: string; //The vehicle’s length.
  plateNumber: string; //The vehicle’s plate number.
  driverCabin: string; //Optional. The vehicle’s driver cabin.
  driverBed: string; //Optional. The vehicle’s driver bed.
  fare: string; //Optional. The fare code.
  brand: string; //Optional. The vehicle’s brand.
  nationality: string; //Optional. The nationality vehicle’s owner.
  loyaltyNumber: string; //Optional. The vehicle’s loyalty number.
  model: string; //Optional. The vehicle’s model.
  identificationNumber: string; //Optional. The vehicle’s identification number.
  height: string; //Optional. The vehicle’s height.
  price: Price;
  ticket: Ticket;
  accommodation: Accommodation;
  discount: Discount;
  action: Action; //Used for booking modification. Values: I (Insert), D (Delete), no value indicates item should be as is
}
