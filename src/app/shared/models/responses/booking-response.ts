import { BookingLeader } from '../common/booking-leader';
import { Price } from '../../../models/common/price';
import { Trip } from '../../../models/common/trip';
import { AgencyService } from '../common/agency-service';
import { BookingFailureDetail } from '../common/booking-failure-detail';

export class BookingResponse {
  code: string;
  severeError: string;
  message: string;
  crsReservationId: number;
  errorCode: string;
  fareIdOrCode: string;
  paymentType: string;
  ticketed: boolean; //Used in booking retrieval. Holds value of true in case of ticketed booking
  supportsVoucherGeneration: boolean;
  leader: BookingLeader;
  priceOfBooking: Price;
  trips: Trip[] = [];
  agencyService: AgencyService;
  bookingFailureDetail: BookingFailureDetail[] = [];
}
