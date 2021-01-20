import { Company } from './company';

export class Vessel {
  idOrCode:	string;
  name:	string;
  company:	Company;
  hasGarage:	boolean;
  hasCabins:	boolean;
  type:	string;
  infantAccommodationIdOrCode:	string;
}
