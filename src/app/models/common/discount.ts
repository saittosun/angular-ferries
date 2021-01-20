export class Discount {

  crsCode: string;
  idOrCode: string; //The discount’s unique id or code.
  abbreviation: string; //The discount’s abbreviation.
  name: string; //The discount’s name.
  type: string;
  needsMandatoryData: boolean; //whether the discount must be associated with a document number
  needsMandatoryLoyaltyCard: boolean; //whether the discount must be associated with a loyalty card
  description: string; //The discount’s description.
  // company: Company;
  autoApply: boolean;


  initilaize(key: string, discount) {
    this.idOrCode = key;
    this.crsCode = discount.crsCode;
    this.abbreviation = discount.abbreviation;
    this.name = discount.name;
    this.type = discount.type;
    this.needsMandatoryData = discount.needsMandatoryData;
    this.needsMandatoryLoyaltyCard = discount.needsMandatoryLoyaltyCard;
    this.description = discount.description;
    this.autoApply = discount.autoApply;
  }
}
