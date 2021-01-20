import { Discount } from './discount';

export class DiscountDictionary {
  vehicles: {[key: string]: Discount}[];
  passengers: {[key: string]: Discount}[];
}
