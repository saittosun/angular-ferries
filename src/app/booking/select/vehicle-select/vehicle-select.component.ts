import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VehicleDetail } from 'src/app/models/app-models/selected-trip';
import { Accommodation } from 'src/app/models/common/accommodation';
import { CompanyDictionary } from 'src/app/models/common/company-dictionary';
import { Discount } from 'src/app/models/common/discount';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-select',
  templateUrl: './vehicle-select.component.html',
  styleUrls: ['../select.component.css']
})

export class VehicleSelectComponent implements OnInit {

  @Output() vehicleChangeEvent = new EventEmitter();
  @Input() companyDictionary: CompanyDictionary;
  @Input() vehicleCount:number;
  @Input() dicIndex: number;
  @Input() tripIndex: number;
  @Input() isSubmitted: boolean[][];
  vehicleTypes: Accommodation[];
  vehicleLengths: number[];
  vehicleDiscounts: Discount[];

  constructor() { }

  ngOnInit(): void {
    this.vehicleTypes = new Array(environment.MAX_VEHICLE_COUNT).fill(null);
    this.vehicleLengths = new Array(environment.MAX_VEHICLE_COUNT).fill(null);
    this.vehicleDiscounts = new Array(environment.MAX_VEHICLE_COUNT).fill(this.companyDictionary.vehicleDiscounts[0]);
  }

  handleChange(){
    const vehicleDetails: VehicleDetail[] = [];
    for (let i=0 ; i<this.vehicleCount ; i++){
      const vehicleDetail = new VehicleDetail(null);
      let length = 0;
      if (this.vehicleTypes[i] && this.vehicleTypes[i].pricingPerMeter){
        length = this.vehicleLengths[i];
      } else if (this.vehicleTypes[i]) {
        length = this.vehicleTypes[i].length;
      }
      vehicleDetail.vehicleDiscount = this.vehicleDiscounts[i];
      vehicleDetail.vehicleLength = length;
      vehicleDetail.vehicleType = this.vehicleTypes[i];
      vehicleDetails.push(vehicleDetail);
    }
    this.vehicleChangeEvent.emit({
      dicIndex: this.dicIndex,
      tripIndex: this.tripIndex,
      vehicleDetails: vehicleDetails,
    })
  }

  getVehicleLengthLabel(i: number){
    return 'Min ' + this.vehicleTypes[i].length + 'cm - Max ' + this.vehicleTypes[i].maxLength + 'cm';
  }

  getVehicleLengths(i: number): number[]{
    const min = Math.ceil(this.vehicleTypes[i].length /100);
    const max = Math.floor(this.vehicleTypes[i].maxLength/100);
    const options: number [] = [];
    for (let i = min * 2 ; i <= max*2 ; i++){
      options.push(i/2);
    }
    return options;
  }
}
