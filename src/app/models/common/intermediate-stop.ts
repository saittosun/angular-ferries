export class IntermediateStop {
  originIdOrCode: string; //The abbreviation of the origin’s location (Location#idOrCode).
  destinationIdOrCode: string; //The abbreviation of the destination’s location (Location#idOrCode).
  departureDateTime: string; //The format is YYYY-MM-DD HH:MM.
  departureDateTimeWithTimezone: string; // The format is YYYY-MM-DD’T’HH:MM:SS.SSZZ.
  arrivalDateTime: string; // The format is YYYY-MM-DD HH:MM.
  arrivalDateTimeWithTimezone: string; //The format is YYYY-MM-DD’T’HH:MM:SS.SSZZ.
  duration: number; // The duration of the trip, in minutes
  // vessel: Vessel;
}
