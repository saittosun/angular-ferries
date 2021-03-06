import { Company } from '../../../models/common/company';

export class FarePerCompany {

  idOrCode: string; //The fare’s id or code.
  name: string; //The fare’s name.
  description: string; //The fare’s description.
  needsMandatoryData: boolean; //The fare must be associated with the code number
  company: Company;

}
