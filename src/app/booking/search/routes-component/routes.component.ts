import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SearchForm } from 'src/app/models/app-models/search-form';
import { Location } from 'src/app/models/common/location';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['../search.component.css'],
})
export class RoutesComponent implements OnInit, OnChanges {

  origin: Location;
  destination: Location;
  originInput: string = '';
  destinationInput: string = '';

  @Output() routSelectEvent = new EventEmitter();
  @Input() searchForm: SearchForm;
  @Input() origins: Location[];
  destinations: Location[] = [];
  @Input() index: number;
  @Input() isSubmitted:boolean;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
  }

  destinationSelected() {
    const code = this.origin.idOrCode + '-' + this.destination.idOrCode;
    this.bookingService.setRouteFrequencyDictionary(code);
    this.emitForm();
  }

  originSelected() {
    this.destinations = this.bookingService.getDestinationOptions(this.origin);
    this.destination = null;
    this.emitForm();
  }

  emitForm() {
    this.routSelectEvent.emit({
      origin: this.origin,
      destination: this.destination,
      index: this.index
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.searchForm) return;
  }
}
