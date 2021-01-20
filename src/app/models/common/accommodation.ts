import { SpecificType } from '../enums/specific-type.enum';

export class Accommodation {
  idOrCode:	string;
  abbreviation:	string;
  name:	string;
  type:	string;
  // description:	string;
  specificType:	SpecificType;
  capacity:	number;
  length:	number;
  maxLength:	number;
  height:	number;
  tripKindAllowed:	string;
  pricingPerMeter:	boolean;
  // company:	Company;
  number:	string;
  bed:	string;
  exclusiveUse:	boolean;
  group:	string;
  external:	boolean;
  supportsTemplate:	boolean;
  // images:	Image[];

  initilaizeForVehicle(key:string, accommodation){
    this.idOrCode = key;
    this.abbreviation = accommodation.abbreviation;
    this.name = accommodation.name;
    this.type = accommodation.type;
    this.specificType = accommodation.specificType;
    this.capacity = accommodation.capacity;
    this.length = accommodation.length;
    this.maxLength = accommodation.maxLength;
    this.height = accommodation.height;
    this.tripKindAllowed = accommodation.tripKindAllowed;
    this.pricingPerMeter = accommodation.pricingPerMeter;
    this.number = accommodation.number;
    this.bed = accommodation.bed;
    this.exclusiveUse = accommodation.exclusiveUse;
    this.group = accommodation.group;
    this.external = accommodation.external;
    this.supportsTemplate = accommodation.supportsTemplate;
  }

  initilaizeForPassenger(accommodation: Accommodation, accommodation2: Accommodation){
    this.idOrCode = accommodation.idOrCode;
    this.abbreviation = accommodation2.abbreviation;
    this.name = accommodation2.name;
    this.type = accommodation2.type;
    this.specificType = accommodation2.specificType;
    this.capacity = accommodation2.capacity;
    this.length = accommodation2.length;
    this.maxLength = accommodation2.maxLength;
    this.height = accommodation2.height;
    this.tripKindAllowed = accommodation2.tripKindAllowed;
    this.pricingPerMeter = accommodation2.pricingPerMeter;
    this.number = accommodation2.number;
    this.bed = accommodation2.bed;
    this.exclusiveUse = accommodation.exclusiveUse;
    this.group = accommodation2.group;
    this.external = accommodation2.external;
    this.supportsTemplate = accommodation.supportsTemplate;
  }
}
