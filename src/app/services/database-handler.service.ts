import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SearchForm } from 'src/app/models/app-models/search-form';
import { PhpRoute } from '../models/app-models/php-route';
import { TimeTableRequest } from '../models/requests/search-request';
import { SearchResponse } from '../models/responses/search-response';
import { Booking } from '../shared/models/requests/booking';
import { BookingRequest } from '../shared/models/requests/booking-request';
import { BookingResponse } from '../shared/models/responses/booking-response';
import { FequencyResponse } from '../shared/models/responses/frequency-response';
import { environment } from 'src/environments/environment';
import { StripeData, StripePaymentIntent } from '../booking/payment/stripe/stripe.component';

@Injectable({
  providedIn: 'root',
})
export class DatabaseHandlerService {

  urlEndpoint = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getAllRoutes(){
    return this.http.get<PhpRoute>(this.urlEndpoint + 'api/gf/all-routes');
  }

  getRouteFrequency(code: string) {
    const params = new HttpParams().append('code', code);
    return this.http.get<FequencyResponse>(
        this.urlEndpoint + 'api/gf/get-route-frequency',
        { params }
    );
  }


  postSearchRequest(searchForm: SearchForm): Observable<SearchResponse> {
    const request: TimeTableRequest[] = [];
    for (let i = 0; i < searchForm.routes.length; i++) {
      request.push(new TimeTableRequest(searchForm, i));
    }
    return this.http
      .post(this.urlEndpoint + 'api/gf/list-of-trips', request, { //DONT FORGET TO CHANGE
        observe: 'body',
      })
      .pipe(
        map(response => {
          console.log('postSearchRequest :', response);
          const searchResponse = new SearchResponse(response);
          return searchResponse;
        }),
        catchError(errorRes => throwError(this.getErrorMessage(errorRes)))
      );
  }

  pricingRequest(bookingRequest: BookingRequest): Observable<BookingResponse> {
    return this.http
      .post<BookingResponse>(
        this.urlEndpoint + 'api/gf/pricing',
        bookingRequest
      )
      .pipe(catchError((errorRes) => throwError(this.getErrorMessage(errorRes))));
  }

  // bookingRequest(bookingRequest: BookingRequest): Observable<BookingResponse>{
  //   return this.http.post <BookingResponse>(this.urlEndpoint + '/pro-booking', bookingRequest, {observe: 'body'});
  // }

  addPaymentIntentStripe(data: StripeData):Observable<StripePaymentIntent> {
    console.log('data', data);
    return this.http
      .post<any>(this.urlEndpoint + 'api/gf/stripe-intent', data , {observe: 'body'})
      .pipe(catchError((errorRes) => throwError(this.getErrorMessage(errorRes))));
  }

  sendBookingRequest(booking: Booking): Observable<any> {
    console.log("booking", booking);
    return this.http
      .post(this.urlEndpoint + 'api/gf/booking', booking, {observe: 'body'})
      .pipe(catchError((errorRes) => throwError(this.getErrorMessage(errorRes))));
  }

  private getErrorMessage(errorRes): string {
    console.log(errorRes);
    let errorMessage = 'An error occured. Please try again later.';
    if (errorRes && errorRes.error){
      if (errorRes.error.message) return errorRes.error.message;
      if (errorRes.error.errors) return errorRes.error.errors;
    }
    return errorMessage;

  }
}
