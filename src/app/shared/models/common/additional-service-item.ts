export class AdditionalServiceItem {
  idOrCode: string; //The id or code of the service item.
  name: string; //The service item’s name.
  chargeType: string; //Defines the charge type of the item. Possible values are PER_UNIT, PER_BOOKING, etc.
  availableUnits: number; //The number of available units.
  price: number; //The item’s price. Value multiplied by 100.
  ticketLetter: string; //Ticket Letter used for billing reconciliation.
  ticketNumberOrVoucher: string; //Ticket number or voucher used for billing reconciliation
}
