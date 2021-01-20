import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { switchMap, tap } from 'rxjs/operators';
import { DatabaseHandlerService } from 'src/app/services/database-handler.service';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  isLoading: boolean = false;

  sttipePaymentIntent: StripePaymentIntent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#000000',
        color: '#000000',
        lineHeight: '5',
        fontWeight: '500',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {color: '#000000'},
        '::placeholder': {color: '#616161'}
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee'
      }
    },
    hidePostalCode: true,
    iconStyle : 'solid'
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<StripeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StripeData,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private databaseHandlerService: DatabaseHandlerService) {}


  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  pay(): void {
    if (this.stripeTest.valid) {
      this.isLoading = true;
      this.databaseHandlerService.addPaymentIntentStripe(this.data)
        .pipe(
          tap(data => console.log(data)),
          switchMap((stripePaymentIntent) =>
            this.stripeService.confirmCardPayment(stripePaymentIntent.client_secret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.stripeTest.get('name').value,
                },
              },
            })
          )
        )
        .subscribe((response) => {
          if (response.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(response.error.message);
            console.log(response);
            this.isLoading = false;
            this.dialogRef.close({
              status: false, //Error
              body: response
            });
            this.isLoading = false;
          } else {
            // The payment has been processed!
            if (response.paymentIntent.status === 'succeeded') {
              console.log(response);
              // Show a success message to your customer
              this.isLoading = false;
              this.dialogRef.close({
                status: true, //Success
                body: response
              });
            }
          }
        });
    } else {
      console.log(this.stripeTest);
    }
  }
}

export interface StripePaymentIntent{
  id: string,
  amount: number,
  description: string,
  client_secret: string
}

export interface StripeData{
  price: number,
  description: string
}


// {
//   "paymentIntent": {
//     "id": "pi_1I94mWAJV9TUrw8PpjC8K7Zv",
//     "object": "payment_intent",
//     "amount": 120,
//     "canceled_at": null,
//     "cancellation_reason": null,
//     "capture_method": "automatic",
//     "client_secret": "pi_1I94mWAJV9TUrw8PpjC8K7Zv_secret_AB05VMOuCyVSMyBGG3yAgh2rZ",
//     "confirmation_method": "automatic",
//     "created": 1610526764,
//     "currency": "eur",
//     "description": "Ferry confirmation document.",
//     "last_payment_error": null,
//     "livemode": false,
//     "next_action": null,
//     "payment_method": "pm_1I94mWAJV9TUrw8Pxe7pVWEA",
//     "payment_method_types": [
//       "card"
//     ],
//     "receipt_email": null,
//     "setup_future_usage": null,
//     "shipping": null,
//     "source": null,
//     "status": "succeeded"
//   }
// }
