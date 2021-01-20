export class LiknosUser {
  code: string;
  message: string;
  severeError: boolean;
  agencyCode: number;
  userName: string;
  password: string;
  signature: string;
  language: string;
  incomingHost: string;
  session: string;
  memberIdOrCode: string;
  channel: string;
  bookingIdentifier: string;
  versions: string[] = [];
}
