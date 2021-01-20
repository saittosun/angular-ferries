import { Adress } from '../../shared/models/common/adress';
import { Company } from '../common/company';
import { Country } from '../common/country';
import { Vehicle } from '../common/vehicle';

export interface InformationForm{
  contactPhoneNumber: string,
  contactEmail: string,
  subscribe: boolean,
  // adress: Adress,
  passengers: [
    {
      firstName: string,
      lastName: string,
      nationality: Country,
      birthDate: Date,
      documentType: string,
      documentNumber: string,
      documentExpirationDate: Date
    }
  ],
  vehicles: Vehicle[],
  company: Company
}
