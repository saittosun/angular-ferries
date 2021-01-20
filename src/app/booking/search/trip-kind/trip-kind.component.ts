import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-trip-kind',
  templateUrl: './trip-kind.component.html',
  styleUrls: ['../search.component.css'],
})
export class TripKindComponent implements OnInit {

  @Output() tripKindEvent = new EventEmitter<number>();
  @Input() tripKind: number;

  constructor() { }

  ngOnInit(): void {
  }

  changeTripKind($event: { value: number; }) {
    this.tripKindEvent.emit($event.value);
  }

}
