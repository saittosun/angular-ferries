
import { SelectedTrip } from '../../../models/app-models/selected-trip';
import { PassengerData } from '../../../models/common/passenger-data';
import { Trip } from '../../../models/common/trip';
import { SearchResponse } from '../../../models/responses/search-response';
import { InformationForm } from '../../../models/app-models/information-form';
import { AgencyService } from '../common/agency-service';
import { BookingLeader } from '../common/booking-leader';
import { BookingPaymentMethodCompany } from '../common/booking-payment-method-company';
import { FarePerCompany } from '../common/fare-per-company';
import { PaymentMethod } from '../../../models/enums/payment-method.enum';

export class BookingRequest{
  fareIdOrCode: string;
  checkForAvailability: boolean;
  leader: BookingLeader;
  trips: Trip [] = [];
  openReturn: boolean;
  member: boolean;
  bookingPaymentMethods: BookingPaymentMethodCompany [];
  farePerCompanies: FarePerCompany [] = [];
  goToPayment: boolean;
  approvalCode: string;
  agencyService: AgencyService;

  pricingConstructor(searchResponse: SearchResponse, selectedTrips: SelectedTrip[]){
    this.bookingPaymentMethods = [];
    this.checkForAvailability = true;
    for (let i=0 ; i<searchResponse.tripsWithDictionary.length ; i++){
      this.trips[i] = new Trip();
      const trip = searchResponse.tripsWithDictionary[i].trips[selectedTrips[i].tripIndexInSearchResponse];
      this.trips[i].pricingConstructor(trip, selectedTrips[i]);
    }
  }

  addInformation (prices: number[], information: InformationForm) {
    this.goToPayment= false;
    this.leader = new BookingLeader();
    this.leader.firstName = information.passengers[0].firstName,
    this.leader.lastName = information.passengers[0].lastName,
    // this.leader.address = information.adress,
    this.leader.email = information.contactEmail,
    this.leader.mobile = information.contactPhoneNumber,
    this.leader.phone = information.contactPhoneNumber;
    this.agencyService = new AgencyService();

    for (let i=0 ; i<this.trips.length ; i++){
      const bookingCompany = new BookingPaymentMethodCompany();
      bookingCompany.company = this.trips[i].vessel.company;
      bookingCompany.paymentMethod = PaymentMethod.CREDIT_CARD;
      bookingCompany.total = prices[i];
      this.bookingPaymentMethods.push(bookingCompany);
      for (let j=0 ; j<this.trips[i].accommodationRequests.length ; j++){
        for (let k=0 ; k<this.trips[i].accommodationRequests[j].accommodationRequestAnalysises.length ; k++){
          const passengerData: PassengerData = this.trips[i].accommodationRequests[j].accommodationRequestAnalysises[k].passengerData;
          const vehicleData = this.trips[i].accommodationRequests[j].accommodationRequestAnalysises[k].vehicleData;
          if (passengerData){
            passengerData.name = information.passengers[k].firstName;
            passengerData.surname = information.passengers[k].lastName;
            passengerData.birthDate = information.passengers[k].birthDate.toISOString().slice(0, 10);
            passengerData.nationality = information.passengers[k].nationality.idOrCode;
            if (information.passengers[k].documentType){
              passengerData.documentType = information.passengers[k].documentType;
              passengerData.documentNumber = information.passengers[k].documentNumber;
              passengerData.documentExpirationDate = information.passengers[k].documentExpirationDate.toISOString().slice(0, 10);
            }
          }else if (vehicleData){
            vehicleData.plateNumber = information.vehicles[k].plateNumber;
          }
        }
      }
    }
  }
}
