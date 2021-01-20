import { SearchResponse } from '../../../models/responses/search-response';
import { SelectedRoute } from './selected-route';

export class SearchParams {
  tripKind: number;
  passengerCount: number = 1;
  vehicleCount: number = 0;
  routes: SelectedRoute[] = [];
  searchResponse: SearchResponse;

  constructor(value: any) {
    if (!value) return;
    this.tripKind = value.tripKind;
    this.passengerCount = value.passengerCount;
    this.vehicleCount = value.vehicleCount;
    if (this.tripKind === 1) {
      this.addRoute(value, 0);
      this.routes.push(
        new SelectedRoute(
          value.routes[0].destination,
          value.routes[0].origin,
          value.routes[0].dateReturn
        )
      );
    } else {
      for (let i = 0; i < this.tripKind + 1; i++) {
        this.addRoute(value, i);
      }
    }
  }
  addRoute(value, index: number) {
    this.routes.push(
      new SelectedRoute(
        value.routes[index].origin,
        value.routes[index].destination,
        value.routes[index].date
      )
    );
  }
}
