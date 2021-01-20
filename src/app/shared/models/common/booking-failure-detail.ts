import { Trip } from '../../../models/common/trip';

export class BookingFailureDetail {
  trip: Trip;
  errorCode: string;
  statusEnum: string; // ENUM: ACTIVE,  CANCELLED_WITH_FEES, CANCELLED_FREE_OF_CHARGE, NEVER_BOOKED
}
