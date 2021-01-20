import { Discount } from './discount';

export class PassengerType {
  code: string;
  type: string;
  name: string;
  description: string;
  minAge: number;
  maxAge: number;
  // accomodations: Accommodation[];
  discounts: Discount[] = [];

  constructor(key:string, passengerType){
    this.code = key;
    this.type = passengerType.type;
    this.name = passengerType.name;
    this.description = passengerType.description;
    this.minAge = passengerType.minAge;
    this.maxAge = passengerType.maxAge;
    const defaultDiscount: Discount = new Discount();
    if (passengerType.discounts.length > 0){
      defaultDiscount.name = 'NO DISCOUNT';
      this.discounts.push(defaultDiscount);
      for (let discount of passengerType.discounts){
        const discountObj = new Discount();
        discountObj.initilaize(discount.idOrCode, discount);
        this.discounts.push(discountObj);
      }
    } else {
        const discount = new Discount();
        discount.name = this.name;
        this.discounts.push(discount);
    }
  }
}
