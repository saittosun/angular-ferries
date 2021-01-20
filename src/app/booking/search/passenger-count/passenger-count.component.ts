import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-passenger-count',
  templateUrl: './passenger-count.component.html',
  styleUrls: ['../search.component.css']
})
export class PassengerCountComponent implements OnInit {

  @Output() passengerOrVehicleSelectEvent = new EventEmitter();
  passengerCount: number = 1;
  vehicleCount: number = 0;
  passengerCountArray: number[] = Array.from({length: environment.MAX_PASSENGER_COUNT}, (v, k) => k+1);
  vehicleCountArray: number[] = [...Array(environment.MAX_VEHICLE_COUNT).keys()];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  selected = () => this.passengerOrVehicleSelectEvent.emit({
    passengerCount: this.passengerCount,
    vehicleCount : this.vehicleCount
  });
}
