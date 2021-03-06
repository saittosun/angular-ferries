export class BookingValidation {
  nationalityCheck: boolean;
  birthDateCheck: boolean;
  birthPlaceCheck: boolean;
  idOrPassportCheck: boolean;
  expirationOfDocumentCheck: boolean;
  askForDetails: boolean;
  mandatorySex: boolean;
  mandatoryPassengerType: boolean;
  mandatorySurname: boolean;
  mandatoryName: boolean;
  mandatoryDocument: boolean;
  mandatoryPlateNumber: boolean;
  mandatoryVehicleLength: boolean;
  mandatoryVehicleHeight: boolean;
  mandatoryDriverName: boolean;
  mandatoryBrandName: boolean;
  mandatoryModelName: boolean;
  mandatoryVehicleExistence: boolean;
  allowsMoreThanTwoTrips: boolean;
  hidePassengerDetails: boolean;
  supportsDifferentBookingPerTrip: boolean;
  passengerLimitPerTrip: number;
  vehicleLimitPerTrip: number;
  supportsLoyaltyCard: boolean;
  supportsResidentLoyalty: boolean;
  supportsDoGenerateVoucherMethod: boolean;
  supportsOptionalBooking: boolean;
  supportsAccommodationPlan: boolean;
  mandatoryCabinAccommodation: boolean;
  supportsHMEOVoucher: boolean;
}
