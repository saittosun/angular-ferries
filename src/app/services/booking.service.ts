import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Location } from 'src/app/models/common/location';
import { SearchForm } from '../models/app-models/search-form';
import { RoutAlternatives } from '../shared/models/booking-model/rout-alternatives';
import { RouteDateAlternative } from '../models/app-models/rout-date-alternative';
import { DatabaseHandlerService } from './database-handler.service';
import { LocationsService } from './locations.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService{

  routeDictionary: RoutAlternatives[] = [];
  routeFrequencyDictionary: Map<string, number[]> = new Map<string, number[]>();
  origins: Location[] = [];
  routeDateAlternatives: RouteDateAlternative [] = [];

  constructor(private databaseHandlerService: DatabaseHandlerService,
              private locationsService: LocationsService,) {}

  setRouteDateAlternatives(searchForm: SearchForm) {
    for(let i=0 ; i < searchForm.routes.length ; i++ ){
      const date: Date = searchForm.routes[i].date;
      // date.setDate(date.getDate() + 1);
      const currentDate = date.getTime();
      const code = searchForm.routes[i].origin.idOrCode + '-' + searchForm.routes[i].destination.idOrCode;
      const routeFrequency = this.routeFrequencyDictionary.get(code);
      const index = routeFrequency.indexOf(currentDate);
      const previousdate = index-1 >= 0 ? routeFrequency[index-1] : null;
      const nextDate = index+1 < routeFrequency.length ? routeFrequency[index + 1] : null;
      this.routeDateAlternatives[i] = ({previousDate: previousdate, currentDate: currentDate, nextDate: nextDate});
    }
    console.log(this.routeDateAlternatives);
  }

  setLocations() {
    console.log('setLocations');
    // const params = new HttpParams().append('type', 'SEA_TRANSPORT');
    return this.databaseHandlerService.getAllRoutes().pipe(
      tap(body => {
        const data = body.data;
        const locations: Location[] = this.locationsService.getLocations();
        const locationMap = new Map<string, string[]>();
        for (let route of data) {
          if (locationMap.has(route.originId)) {
            locationMap.get(route.originId).push(route.destinationId);
          } else locationMap.set(route.originId, [route.destinationId]);
        }
        if (locationMap.size === 0) return;
        for (const [key, value] of locationMap.entries()) {
          if (value) {
            const alternative: RoutAlternatives = new RoutAlternatives();
            alternative.origin = locations.find((loc) => loc.idOrCode === key);
            const destinations = [];
            value.forEach((id) =>
              destinations.push(locations.find((loc) => loc.idOrCode === id))
            );
            alternative.destinations = destinations;
            this.routeDictionary.push(alternative);
          }
        }
        this.routeDictionary.sort((a, b) => {
          return a.origin.name > b.origin.name ? 1 : -1;
        });
        this.routeDictionary.forEach((route) =>
          this.origins.push(route.origin)
        );
      }),
      map(body => this.getOrigins())
    );
  }

  setRouteFrequencyDictionary(code: string) {
    const offset: number = new Date().getTimezoneOffset();
    if (!this.routeFrequencyDictionary.get(code)) {
      this.databaseHandlerService.getRouteFrequency(code).subscribe((response) => {
          const dateArray: number[] = [];
          response.data.dates.forEach((date) => {
            dateArray.push(date + offset * 60 * 1000);
          });
          this.routeFrequencyDictionary.set(response.data.code, dateArray);
        });
    }
  }

  getRouteFrequencyDictionary(code: string): number[] {
    return this.routeFrequencyDictionary.get(code)
      ? this.routeFrequencyDictionary.get(code)
      : [];
  }

  // getRouteDictionary() {
  //   return [...this.routeDictionary];
  // }

  //returns the all alternatives of origins.
  getOrigins() {
    return this.origins;
  }

  getOriginOptions(location: Location): Location[] {
    const destinations: Location[] = [];
    for (let loc of this.routeDictionary) {
      for (let des of loc.destinations) {
        if (des.idOrCode === location.idOrCode) {
          destinations.push(loc.origin);
        }
      }
    }
    return destinations;
  }

  getDestinationOptions(location: Location): Location[] {
    for (let loc of this.routeDictionary) {
      if (loc.origin.idOrCode === location.idOrCode) {
        return loc.destinations;
      }
    }
    return [];
  }

  isTripToAbroad(originIdOrCode: string, destIdOrCode: string): boolean {
    const origin = this.locationsService
      .getLocations()
      .find((loc) => loc.idOrCode === originIdOrCode);
    const destination = this.locationsService
      .getLocations()
      .find((loc) => loc.idOrCode === destIdOrCode);
    if (origin.country.idOrCode === destination.country.idOrCode) return false;
    return true;
  }
}
