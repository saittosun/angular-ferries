import { Location } from './location';
import { Vessel } from './vessel';
import { IntermediateStop } from './intermediate-stop';
import { AccommodationAvailability } from './accommodation-availability';
import { Price } from './price';
import { Ticket } from './ticket';
import { AccommodationRequest } from './accommodation-request';
import { Passenger } from './passenger';
import { Vehicle } from './vehicle';
import { CompanyDictionary } from './company-dictionary';
import { SelectedTrip } from '../app-models/selected-trip';
import { AccommodationRequestAnalys } from './accommodation-request-analysis';
import { AccommodationRequestType } from '../enums/accommodation-request-type.enum';
import { Gender } from '../enums/gender.enum';
import { Accommodation } from './accommodation';
import { BookingValidation } from './booking-validation';


export class Trip {

  code: string;
  message: string;
  severeError: boolean;
  departureDateTime : string; //The format is YYYY-MM-DD HH:MM.
  departureDateTimeWithTimezone: string; //The format is YYYY-MM-DD’T’HH:MM:SS.SSZZ.
  arrivalDateTime: string; //The format is YYYY-MM-DD HH:MM.
  arrivalDateTimeWithTimezone: string; //The format is YYYY-MM-DD’T’HH:MM:SS.SSZZ.
  duration: number; //The duration of the trip, in minutes
  origin: Location;
  destination: Location;
  vessel: Vessel;
  companyDictionary: CompanyDictionary;
  seasonName: string;
  accommodationAvailabilities: AccommodationAvailability[] = [];
  intermediateStops: IntermediateStop[] = [];
  // additionalServices: AdditionalService[];
  accommodationRequests: AccommodationRequest[] = [];
  prices: Price[] = [];
  discountPrices: Price[] = [];
  tickets: Ticket[] = [];
  companyReservationCode: string; //Optional. The booking’s unique identification number at the operator’s system. Used in doBooking method.
  companyReservationCodeAccessCode: string; //Optional. Used in doBooking method for some companies. The access code of the booking in the operator’s system.
  remarks: string;
  optionDateTime: string;
  passengers: Passenger[] = [];
  vehicles: Vehicle[] = [];
  basicPrice: number; // basic price of the quote
  discountPrice: number; //price of the quote with possible discount
  bookingValidation: BookingValidation;

  // This method used by Search Response class, to convert initial Trip serponse.
  initilaize(trip, companies, locations){
    if (trip){
      this.code = trip.code;
      this.message = trip.message;
      this.severeError = trip.severeError;
      this.departureDateTime = trip.departureDateTime;
      this.departureDateTimeWithTimezone = trip.departureDateTimeWithTimezone;
      this.arrivalDateTime = trip.arrivalDateTime;
      this.arrivalDateTimeWithTimezone = trip.arrivalDateTimeWithTimezone;
      this.duration = trip.duration;
      this.vessel = trip.vessel;
      this.seasonName = trip.seasonName;
      this.remarks = trip.remarks;
      this.optionDateTime = trip.optionDateTime;
      this.basicPrice = trip.basicPrice;
      this.discountPrice = trip.discountPrice;
      this.origin = locations[trip.origin.idOrCode];
      this.destination = locations[trip.destination.idOrCode];
      if (companies){
        this.companyDictionary = new CompanyDictionary(this.vessel, companies);
      }
    }
    if (trip.accommodationAvailabilities){
      for(let availability of trip.accommodationAvailabilities){
        const accomodation: Accommodation = companies[this.vessel.company.abbreviation].accommodations.passengers[availability.accommodation.idOrCode];
        this.accommodationAvailabilities.push(new AccommodationAvailability(availability, accomodation));
      }
      this.accommodationAvailabilities.sort((a,b)=> {
        if(a.accommodation.capacity == b.accommodation.capacity){
          return a.adultBasePrice > b.adultBasePrice ? 1 : -1;
        }
        return a.accommodation.capacity > b.accommodation.capacity ? 1 : -1;
      })
    }
    if (trip.intermediateStops){
      for (let stop of trip.intermediateStops){
        this.intermediateStops.push(stop);
      }
    }
    this.bookingValidation = trip.bookingValidation;
  }

   /**
   *
   * @param trip comes from search form
   * @param selectedTrip comes from select component
   * Bu fonksiyon, accodomotionslari ayarlamak icin kurgulanmistir. Cabin ise tum kabin secilmektedir.
   */
  pricingConstructor(trip: Trip, selectedTrip: SelectedTrip) {

    this.departureDateTime = trip.departureDateTime;
    this.origin = trip.origin;
    this.destination = trip.destination;
    this.vessel = trip.vessel;
    this.duration = trip.duration;
    this.bookingValidation = trip.bookingValidation;

    for (let i=0 ; i<selectedTrip.passengers.length ; i++){
      const capacity = selectedTrip.passengers[i].availability.accommodation.capacity;
      if(capacity > 1){
        const request = new AccommodationRequest();
        request.constructPassenger (selectedTrip.passengers[i], AccommodationRequestType.COMPLETE);
        const passArray = [];
        for (let j=i ; j<i+capacity ; j++){
          const analys = new AccommodationRequestAnalys(selectedTrip.passengers[j], null);
          // if (analys.passengerData.type == 'I0'){
          //   request.idOrCode = trip.vessel.infantAccommodationIdOrCode;
          // }
          request.accommodationRequestAnalysises.push(analys);
        }
        this.accommodationRequests.push(request);
        i += i+capacity-1;
      } else {
        const type = selectedTrip.passengers[i].gender === Gender.MALE ?  AccommodationRequestType.MALE_BERTH : AccommodationRequestType.FEMALE_BERTH;
        const request = new AccommodationRequest();
        request.constructPassenger (selectedTrip.passengers[i], type);
        const analys = new AccommodationRequestAnalys(selectedTrip.passengers[i], null);
        if (analys.passengerData.type == 'I0'){
          request.idOrCode = this.accommodationRequests[i-1].idOrCode;
          // request.idOrCode = trip.vessel.infantAccommodationIdOrCode;
        }
        request.accommodationRequestAnalysises.push(analys);
        this.accommodationRequests.push(request);
      }
    }

    for (let i=0 ; i<selectedTrip.vehicles.length ; i++) {
      const request = new AccommodationRequest();
      request.constructVehicle(selectedTrip.vehicles[i]);
      request.accommodationRequestAnalysises.push(new AccommodationRequestAnalys(null, selectedTrip.vehicles[i]));
      this.accommodationRequests.push(request);
    }
  }
}
