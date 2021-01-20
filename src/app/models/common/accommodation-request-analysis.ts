import { PassengerDetail, VehicleDetail } from '../app-models/selected-trip';
import { PassengerData } from './passenger-data';
import { VehicleData } from './vehicle-data';

export class AccommodationRequestAnalys {
  index: number = 1;
  discountIdOrCode: string = null;
  discountDocument: string;
  specialType: string;
  loyaltyCard: string;
  promotionalCode: string;
  fareIdOrCode: string;
  passengerData: PassengerData;
  vehicleData: VehicleData;

  constructor(passengerDetail: PassengerDetail, vehicleDetail: VehicleDetail){
    if (passengerDetail){
      if (passengerDetail.passengerDiscount.idOrCode){
        this.discountIdOrCode = passengerDetail.passengerDiscount.idOrCode;
      }
      this.passengerData = new PassengerData();
      this.passengerData.specialNeeds = false;
      this.passengerData.sexType = passengerDetail.gender;
      this.passengerData.type = passengerDetail.passengerType.code;
    } else {
      this.discountIdOrCode = vehicleDetail.vehicleDiscount.idOrCode;
      this.vehicleData = new VehicleData();
      this.vehicleData.length = vehicleDetail.vehicleLength / 100;
    }
  }
}
