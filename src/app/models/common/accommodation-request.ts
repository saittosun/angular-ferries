import { AccommodationRequestAnalys } from './accommodation-request-analysis';
import { BedType } from '../enums/bed-type.enum';
import { AccommodationRequestType } from '../enums/accommodation-request-type.enum';
import { PassengerDetail, VehicleDetail } from '../app-models/selected-trip';

export class AccommodationRequest {
  idOrCode: string; // 'A2',
  accommodationRequestType: AccommodationRequestType; //'COMPLETE',
  bedType: BedType = BedType.NO_PREFERENCE;
  quantity: number = 1;
  accommodationRequestAnalysises: AccommodationRequestAnalys[] = [];

  constructPassenger(passenger: PassengerDetail, type:AccommodationRequestType){
    this.idOrCode = passenger.availability.accommodation.idOrCode;
    this.accommodationRequestType = type;
  }

  constructVehicle(vehicle: VehicleDetail){
    this.idOrCode = vehicle.vehicleType.idOrCode;
    this.accommodationRequestType = AccommodationRequestType.VEHICLE;
  }
}
