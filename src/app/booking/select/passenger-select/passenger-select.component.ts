import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccommodationAvailability } from 'src/app/models/common/accommodation-availability';
import { PassengerType } from 'src/app/models/common/passenger-type';
import { Trip } from 'src/app/models/common/trip';
import { Gender } from 'src/app/models/enums/gender.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-passenger-select',
  templateUrl: './passenger-select.component.html',
  styleUrls: ['./passenger-select.component.css'],
})
export class PassengerSelectComponent implements OnInit {
  @Input() trip: Trip;
  @Input() passengerCount: number;
  @Input() vehicleCount: number;
  @Input() dicIndex: number;
  @Input() tripIndex: number;
  @Input() genders: Gender[];
  @Input() selectedGenders: Gender[];
  @Output() genderChangeEvent = new EventEmitter();
  @Output() accommodationChangeEvent = new EventEmitter();
  @Output() passengerDiscountChangeEvent = new EventEmitter();
  @Output() passengerTypeChangeEvent = new EventEmitter();
  selectedGender: Gender;
  selectedPassengerTypeIndex: number[];
  selectedPassengerTypes: PassengerType[];
  selectedAccommodationAvailabilities: AccommodationAvailability[];
  defaultAccom: AccommodationAvailability;

  ngOnInit(): void {
    this.selectedGender = this.genders[0];
    this.selectedPassengerTypeIndex = new Array(environment.MAX_PASSENGER_COUNT).fill(0);
    const passType = this.trip.companyDictionary.passengerTypes[0];
    this.selectedPassengerTypes = new Array(environment.MAX_PASSENGER_COUNT).fill(passType);
    this.defaultAccom = this.trip.accommodationAvailabilities[0];
    this.selectedAccommodationAvailabilities = new Array(environment.MAX_PASSENGER_COUNT).fill(this.defaultAccom);
  }


  handleGenderChange(i: number) {
    this.genderChangeEvent.emit({
      index: i,
      gender: this.selectedGender,
    });
  }

  handlePassengerTypeChange(obj) {
    const passengerType: PassengerType = obj.passengerType;
    const passengerIndex = obj.passengerIndex;
    this.selectedPassengerTypes[passengerIndex] = passengerType;
    console.log(this.selectedPassengerTypes);
    this.selectedPassengerTypeIndex[passengerIndex] = this.trip.companyDictionary.passengerTypes.indexOf(passengerType);
    this.passengerTypeChangeEvent.emit({
      ...obj,
      dicIndex : this.dicIndex,
      tripIndex: this.tripIndex
    });
  }



  handlePassengerDiscountChange(obj){
    this.passengerDiscountChangeEvent.emit({
      ...obj,
      dicIndex: this.dicIndex,
      tripIndex: this.tripIndex
    })
  }

  /**
   *
   * @param index accommodation Availibility index that customer selects
   */
  handleAvailabilityChange(index: number) {
    const updatedIndexes = this.setAvailabilities(index);
    this.checkToUp(updatedIndexes[1]);
    this.checkToDown(updatedIndexes[0]-1);
    this.accommodationChangeEvent.emit({
      selectedAccommodationAvailabilities: this.selectedAccommodationAvailabilities,
      dicIndex: this.dicIndex,
      tripIndex: this.tripIndex
    });
  }

  /**
   * Set all availibilities that selected to the selectedAccommodationAvailabilities
   */
  setAvailabilities(index: number): number[] {
    const updatedIndexes: number[] = [index, index+1];
    let cabinCapacity = this.selectedAccommodationAvailabilities[index].accommodation.capacity - 1;
    if (cabinCapacity === 0) return updatedIndexes;
    for (let i = index + 1; i < this.passengerCount; i++) {
      this.selectedAccommodationAvailabilities[i] = this.selectedAccommodationAvailabilities[index];
      cabinCapacity--;
      if (cabinCapacity === 0 || i === this.passengerCount - 1) {
        updatedIndexes[1] = i+1;
        break;
      }
    }
    if (cabinCapacity > 0) {
      for (let i = index - 1; i >= 0; i--) {
        this.selectedAccommodationAvailabilities[
          i
        ] = this.selectedAccommodationAvailabilities[index];
        cabinCapacity--;
        if (cabinCapacity === 0 || i === 0) {
          updatedIndexes[0] = i;
          break;
        }
      }
    }
    return updatedIndexes;
  }

  // Controls changed cabin selection and set some to default, that has broken
  checkToDown(index: number) {
    let firstAccommodation = this.selectedAccommodationAvailabilities[index];
    if (firstAccommodation && firstAccommodation.accommodation.capacity > 1) {
      let count = 0;
      for (let i = index; i >= 0 ; i--) {
        if (this.selectedAccommodationAvailabilities[i] === firstAccommodation) {
          count++;
          if (i === 0 && count !== firstAccommodation.accommodation.capacity){
            this.resetAccommodations(0, index+1);
          }
        } else {
          if (firstAccommodation.accommodation.capacity === count) break;
          this.resetAccommodations(i+1, index+1);
          break;
        }
      }
    }
  }

  checkToUp(index: number) {
    let firstAccommodation = this.selectedAccommodationAvailabilities[index];
    if (firstAccommodation && firstAccommodation.accommodation.capacity > 1) {
      let count = 0;
      for (let i = index; i < this.passengerCount; i++) {
        if (this.selectedAccommodationAvailabilities[i] === firstAccommodation) {
          count++;
          if (i === this.passengerCount-1 && count !== firstAccommodation.accommodation.capacity){
            this.resetAccommodations(index, this.passengerCount);
          }
        } else {
          if (firstAccommodation.accommodation.capacity === count) break;
          this.resetAccommodations(index, i);
          break;
        }
      }
    }
  }

  resetAccommodations(start: number, end: number) {
    for (let i = start; i < end; i++) {
      this.selectedAccommodationAvailabilities[i] = this.defaultAccom;
    }
  }
}
