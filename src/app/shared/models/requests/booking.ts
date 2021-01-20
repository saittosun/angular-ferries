import { PaymentMethod } from 'src/app/models/enums/payment-method.enum';
import { Payment } from '../responses/payment';
import { BookingRequest } from './booking-request';

export class Booking {

  totalPrice: number;
  passengerCount:number;
  vehicleCount: number;
  bookingDate: string;
  payment: Payment;
  paymentType: PaymentMethod;
  bookingRequest: BookingRequest;

  constructor(){
    const date = new Date().toISOString();
    this.bookingDate = date.slice(0, 10) + ' ' + date.slice(11, 16);
  }
}


