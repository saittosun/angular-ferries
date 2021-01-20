export class User {
  authorization : string;
  email: string;
  firstName: string;
  lastName:string;
  role: string;
  tokenExpirationDate: number;
  allBookings: any[];
  allUsers: any[];
  bookingParams : {email: string; bookingId: number};
  bookingsMap = new Map<number, Object>();
}

