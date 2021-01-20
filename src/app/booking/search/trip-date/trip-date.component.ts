import { Component,  EventEmitter, Input,  OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SearchForm } from 'src/app/models/app-models/search-form';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-trip-date',
  templateUrl: './trip-date.component.html',
  styleUrls: ['../search.component.css'],
})
export class TripDateComponent implements OnInit, OnChanges {

  @Output() dateSelectEvent = new EventEmitter();
  @Input() searchForm: SearchForm;
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().getFullYear() + 2, 0, 0);
  @Input() index: number;
  tripCode:string;
  @Input() isSubmitted:boolean;
  selectedDate = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {}

  // When a date entered in the for this medtod runs.
  dateEvent(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
    this.dateSelectEvent.emit({index: this.index, date: this.selectedDate});
  }

  dateFilter = (d: Date | null): boolean => {
    if (!d || d.getTime() < this.minDate.getTime() - 86400000) return false;
    if (d > this.maxDate) return false;
    const dates = this.bookingService.routeFrequencyDictionary.get(this.tripCode);
    if (dates) {
      for (let date of dates) {
        if (d.getTime() === date) {
          return true;
        }
      }
    }
    return false;
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.searchForm || !changes.searchForm) return;
    const searchForm: SearchForm = changes.searchForm.currentValue;
    this.setTripCode(searchForm);
    this.setMinMaxDates(searchForm);
  }

  setTripCode(searchForm: SearchForm) {
    if (searchForm.routes[this.index] && searchForm.routes[this.index].origin && searchForm.routes[this.index].destination){
      this.tripCode = searchForm.routes[this.index].origin.idOrCode + '-' + searchForm.routes[this.index].destination.idOrCode;
    }
  }

  setMinMaxDates(searchForm: SearchForm) {
    if (this.index == 0){
      if (searchForm.routes[1] && searchForm.routes[1].date) this.maxDate = searchForm.routes[1].date;
      else if (searchForm.routes[2] && searchForm.routes[2].date) this.maxDate = searchForm.routes[2].date;
    } else if (this.index == 1){
      if (searchForm.routes[0].date) this.minDate = this.getTrueDate(searchForm.routes[0].date);
      if (searchForm.routes[2] && searchForm.routes[2].date) this.maxDate = searchForm.routes[2].date;
    } else if (this.index == 2){
      if (searchForm.routes[1] && searchForm.routes[1].date) this.minDate = this.getTrueDate(searchForm.routes[1].date);
      else if (searchForm.routes[0].date) this.minDate = this.getTrueDate(searchForm.routes[0].date);
    }
  }

  getTrueDate(date){
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
  }
}
