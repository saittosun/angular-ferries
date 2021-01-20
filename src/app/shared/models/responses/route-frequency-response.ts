export class RouteFrequencyResponse {
  success: boolean;
  code: number;
  locale: string;
  message: string;
  data: {
    item: {
      code: string;
      suitableDates: string[];
    }
  }
}
