import { Company } from '../../../models/common/company';

export class BookingPaymentMethodCompany {
  company: Company;
  paymentMethod: string; //"CREDIT_CARD", "CASH"
  total: number; //6490
}
