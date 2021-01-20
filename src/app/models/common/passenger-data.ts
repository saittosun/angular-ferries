import { Gender } from '../enums/gender.enum';
import { Ticket } from './ticket';

export class PassengerData {
  surname: string;
  name: string;
  specialNeeds: boolean;
  nationality: string;
  birthDate: string;
  birthPlace: string;
  documentNumber: string;
  documentType: string;
  documentExpirationDate: string;
  sexType: Gender;
  type: string;
  accommodationNumber: string;
  accommodationBed: string;
  residentIdOrCode: string;
  email: string;
  hmeoVoucher: string;
  ticket: Ticket;
}
