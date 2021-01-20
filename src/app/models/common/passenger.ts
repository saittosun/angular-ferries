import { Discount } from './discount';
import { Price } from './price';
import { Ticket } from './ticket';
import { Accommodation } from './accommodation';
import { Gender } from '../enums/gender.enum';
import { Action } from '../enums/action.enum';

export class Passenger {
  sex: Gender; //  The passenger’s sex. Possible values are M, F.
  type: string; //The passenger’s type. Possible values are AD, CH, IN, ST, JU, SE, etc.
  surname: string; //The passenger’s surname.
  name: string; //The passenger’s name.
  ssr: boolean; //Indicator on whether the passenger has special needs.
  discount: Discount;
  fare: string; // Optional. The fare code.
  documentNumber: string; //Optional. The passenger’s document number.
  documentType: string; //Optional. The document type.
  documentExpirationDate: string; // Optional. The passenger’s document’s expiration date. The format is YYYY-MM-DD.
  birthDate: string; // Optional. The passenger’s birth date.
  birthPlace: string; // Optional. The passenger’s birth place.
  loyaltyNumber: string; // Optional. The passenger’s loyalty number.
  nationality: string; // Optional. The passenger’s nationality.
  residentIdOrCode: string;
  price: Price;
  accommodation: Accommodation;
  ticket: Ticket;
  action: Action; //Used for booking modification. Values: I (Insert), D (Delete), no value indicates item should be as is
  hmeoVoucher: string; // Oaed Voucher
}
