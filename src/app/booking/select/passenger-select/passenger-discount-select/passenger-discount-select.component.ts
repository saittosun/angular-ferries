import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Discount } from 'src/app/models/common/discount';
import { PassengerType } from 'src/app/models/common/passenger-type';

@Component({
  selector: 'app-passenger-discount-select',
  templateUrl: './passenger-discount-select.component.html',
  styleUrls: ['../passenger-select.component.css']
})
export class PassengerDiscountSelectComponent implements OnInit, OnChanges {

  @Output() passengerDiscountChangeEvent = new EventEmitter();
  @Input() passengerCount: number;
  @Input() index:number;
  @Input() passengerTypes: PassengerType[];
  @Input() selectedPassengerTypeIndex: number;
  passengerDiscount: Discount;

  constructor() { }

  ngOnInit(): void {
    this.passengerDiscount = this.passengerTypes[this.selectedPassengerTypeIndex].discounts[0];
  }

  handleDiscountChange(){
    console.log(this.passengerDiscount);
    this.passengerDiscountChangeEvent.emit({
      passengerDiscount: this.passengerDiscount,
      index: this.index
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedPassengerTypeIndex){
      this.passengerDiscount = this.passengerTypes[changes.selectedPassengerTypeIndex.currentValue].discounts[0];
    }
  }
}
