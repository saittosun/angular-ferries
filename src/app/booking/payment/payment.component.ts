import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PaymentIntent, StripeError } from '@stripe/stripe-js';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { map } from 'rxjs/operators';
import { InformationForm } from 'src/app/models/app-models/information-form';
import { SelectedTrip } from 'src/app/models/app-models/selected-trip';
import { PaymentMethod } from 'src/app/models/enums/payment-method.enum';
import { DatabaseHandlerService } from 'src/app/services/database-handler.service';
import { Booking } from 'src/app/shared/models/requests/booking';
import { Payment } from 'src/app/shared/models/responses/payment';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/store/auth-store/auth.actions';
import { environment } from 'src/environments/environment';
import { StripeComponent, StripeData } from './stripe/stripe.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {

  booking: Booking = new Booking();
  payPalConfig?: IPayPalConfig;
  isConfirmed: boolean = false;
  contactEmail: string;
  contactPhone: string;
  isLoading = false;
  errorMessage: string;
  informationForm: InformationForm;
  selectedTrips: SelectedTrip[];
  customersPrice: number;
  showError: boolean;
  showSuccess: boolean;
  showCancel: boolean;
  paymentType: boolean; //selector for stripe and paypal
  familyImage: SafeStyle;

  constructor(
    private databaseHandlerService: DatabaseHandlerService,
    private router: Router,
    public dialog: MatDialog,
    private store:Store<fromApp.AppState>,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const imgCss = 'background: url(' + environment.BASE_URL + 'images/family-on-vacation-in-europe.jpg) no-repeat center center /cover';
    this.familyImage = this.sanitizer.bypassSecurityTrustStyle(imgCss);
    this.store.select('bookingModel')
      .pipe(map(state=>{ return{
        totalPrice: state.selectPhaseModel.totalPrice,
        bookingRequest: state.infoPhaseModel.bookingRequest,
        passengerCount: state.searchPhaseModel.searchForm.passengerCount,
        vehicleCount: state.searchPhaseModel.searchForm.vehicleCount,
        informationForm: state.infoPhaseModel.informationForm,
        selectedTrips: state.selectPhaseModel.selectedTrips,
        email: state.infoPhaseModel.informationForm.contactEmail,
        phone: state.infoPhaseModel.informationForm.contactPhoneNumber,
      }}))
      .subscribe(state=>{
        this.booking.totalPrice = state.totalPrice;
        this.booking.bookingRequest = state.bookingRequest;
        this.booking.passengerCount = state.passengerCount;
        this.booking.vehicleCount = state.vehicleCount;
        this.informationForm = state.informationForm;
        this.selectedTrips = state.selectedTrips;
        this.contactEmail = state.email;
        this.contactPhone = state.phone;
      });
    this.paypalConfig((this.booking.totalPrice / 100 * 1.035).toFixed(2));
    this.customersPrice = this.booking.totalPrice / 100;
  }

  private sendBookingRequest() {
    console.log("booking", this.booking);
    this.databaseHandlerService.sendBookingRequest(this.booking).subscribe(response=>{
      console.log('response', response);
      this.isLoading = false;
      this.store.dispatch(new AuthActions.AddBookingParameters({
        email : this.informationForm.contactEmail,
        bookingId : +response.message
      }));
      this.router.navigate(['user-booking']);
    },
    errorMessage => {
      this.errorMessage = errorMessage;
      this.isLoading = false;
    });
  }

  payWithCreditCard(){
    const stripeData: StripeData = {
      price: this.booking.totalPrice,
      description: 'Customers email: ' + this.contactEmail + ' phone: ' + this.contactPhone
    };
    const dialogRef = this.dialog.open(StripeComponent, {data: stripeData});
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
      if (response.status){
        const paymentIntent: PaymentIntent = response.body.paymentIntent;
        this.booking.payment = new Payment(null, paymentIntent);
        this.booking.paymentType = PaymentMethod.STRIPE;
        this.sendBookingRequest();
      } else {
        const stripeError: StripeError = response.body;
        this.errorMessage = stripeError.message;
      }
    });
  }

  private paypalConfig(totalPrice: string): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AVKThlS2R5uSjThPe9T53nLfIgfOF9ANIQvzdT8qhCa2jEx65bt0ZZ2DrT3yx_JdpDW9V1SK9T2GreOM',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: totalPrice,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: totalPrice,
                  },
                },
              },
              items: [
                {
                  name: 'Ticket Corfirmation',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: totalPrice,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'horizontal',
        shape: 'rect',
        size: 'small',
        height: 55
      },
      onApprove: (data, actions) => {
        console.log('transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details) => {
          console.log('Payment approved.', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('Payment Authorizeid.', data);
        this.booking.payment = new Payment(data, null);
        this.booking.paymentType = PaymentMethod.PAYPAL;
        this.sendBookingRequest();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.isLoading = false;
        this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        this.isLoading = false;
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.resetStatus();
      }
    };
  }

  private resetStatus(): void {
    this.isLoading = true;
    this.showError = false;
    this.showSuccess = false;
    this.showCancel = false;
  }

  togglePaymentType(type: boolean){
    this.paymentType = type;
    this.customersPrice = type ? this.booking.totalPrice / 100 * 1.035 : this.booking.totalPrice/100;
  }

  openPaymentAgreementDialog() {
    this.dialog.open(PaymentAgreementDialog);
  }
}

@Component({
  selector: 'app-payment-aggreement',
  templateUrl: './payment-agreement.html'
})
export class PaymentAgreementDialog {
  constructor(public dialogRef: MatDialogRef<PaymentAgreementDialog>) {}
  close = () => this.dialogRef.close();
}
