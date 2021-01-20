import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccommodationAvailability } from 'src/app/models/common/accommodation-availability';
import { PassengerType } from 'src/app/models/common/passenger-type';
import { AlertComponent, AlertData } from 'src/app/shared/base-components/alert/alert.component';

@Component({
  selector: 'app-accommodation-select',
  templateUrl: './accommodation-select.component.html',
  styleUrls: ['../passenger-select.component.css'],
})
export class AccommodationSelectComponent implements OnInit {
  @Output() passengerTypeSelectEvent = new EventEmitter();
  @Output() accommodationSelectEvent = new EventEmitter();
  @Input() passengerCount: number;
  @Input() vehicleCount: number;
  @Input() accommodationAvailabilities: AccommodationAvailability[];
  @Input() selectedAccommodationAvailabilities: AccommodationAvailability[];
  @Input() selectedPassengerTypes: PassengerType[];
  @Input() passengerTypes: PassengerType[];
  @Input() index: number;
  passengerType: FormControl;

  constructor( public alertDialog: MatDialog ) {}

  ngOnInit(): void {
    this.passengerType = new FormControl(this.passengerTypes[0], Validators.required);
  }

  handlePassengerTypeChange(e) {
    let children = this.selectedPassengerTypes.reduce((pre, cur)=> cur.maxAge<18 ? pre+1 : pre, 0);
    if (e.value.maxAge < 18 && this.selectedPassengerTypes[this.index].maxAge > 17) children++;
    if (this.passengerCount - children < this.vehicleCount){
      this.passengerType.setValue(this.passengerTypes[0]);
      this.openAlert();
    } else {
      this.passengerTypeSelectEvent.emit({
        passengerIndex: this.index,
        passengerType: e.value,
      });
    }
  }

  handleAvailabilityChange() {
    this.accommodationSelectEvent.emit(this.index);
  }

  openAlert() {
    const data: AlertData = {
      title: 'Alert',
      text : ['Vehicle count must be equal or bigger then adult passenger count.']
    }
    this.alertDialog.open(AlertComponent, {
      width: '400px',
      data:  data
    });
  }
}
