import { PriceAccommodationType } from '../enums/price-accommodation-type';

export class Price {
  total: number; //Used in doPricing and Method. The price of the item.
  net: number;
  tax: number;
  vat: number;
  description: string;
  fareIdOrCode: string;
  additionFees: number[];
  accommodationNumber: string; //Optional. The accommodation number. Used in pricing method, for ForthCRS’ native ferry companies when the request has keepSeats value set to true.
  priceAccommodationType: PriceAccommodationType; // Refers to the type of the item. Possible values are PASSENGER, VEHICLE, EXTRA_SERVICE.
  itemIdOrCode: string; //Optional. The item’s id or code for matching the request’s data. Used when displaying analytical pricing.
}
