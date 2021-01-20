import { PaymentIntent } from "@stripe/stripe-js";
import { IClientAuthorizeCallbackData } from "ngx-paypal";
import { PaymentMethod } from "src/app/models/enums/payment-method.enum";

export class Payment {
  paymentMethod: PaymentMethod;
  paypalId: string;
  stripeId: string;
  payerEmail: string;
  payerId: string;
  payerAddress: string;
  name: string;
  price: number;

  constructor(paypalResponse: IClientAuthorizeCallbackData, paymentIntent: PaymentIntent){
    if (paypalResponse){
      this.paymentMethod = PaymentMethod.PAYPAL;
      this.paypalId = paypalResponse.id;
      this.payerEmail = paypalResponse.payer.email_address;
      this.payerAddress = JSON.stringify(paypalResponse.payer.address);
      this.name = paypalResponse.payer.name.given_name + ' ' + paypalResponse.payer.name.surname;
      this.price = +paypalResponse.purchase_units[0].amount.value;
    } else {
      this.paymentMethod = PaymentMethod.STRIPE;
      this.stripeId = paymentIntent.id;
      this.payerEmail = paymentIntent.receipt_email;
      this.price = paymentIntent.amount;
    }
  }
}

//STRIPE
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


// DETAILS

// {
//   "create_time": "2020-12-15T14:16:32Z",
//   "update_time": "2020-12-15T14:17:01Z",
//   "id": "0M247592PN062493K",
//   "intent": "CAPTURE",
//   "status": "COMPLETED",
//   "payer": {
//     "email_address": "sb-rq4mo4076938@personal.example.com",
//     "payer_id": "UD5HMEXRB7EV2",
//     "address": {
//       "country_code": "GR"
//     },
//     "name": {
//       "given_name": "John",
//       "surname": "Doe"
//     }
//   },
//   "purchase_units": [
//     {
//       "reference_id": "default",
//       "amount": {
//         "value": "0.01",
//         "currency_code": "USD"
//       },
//       "payee": {
//         "email_address": "sb-i6tyu4077814@business.example.com",
//         "merchant_id": "HEJAB9WYRTNY2"
//       },
//       "shipping": {
//         "name": {
//           "full_name": "John Doe"
//         },
//         "address": {
//           "address_line_1": "\\u0395\\u03BB\\u03B5\\u03C5\\u03B8\\u03B5\\u03C1\\u03AF\\u03B1\\u03C2 14",
//           "admin_area_2": "\\u0391\\u03B8\\u03AE\\u03BD\\u03B1",
//           "admin_area_1": "\\u0395\\u03BB\\u03BB\\u03AC\\u03B4\\u03B1",
//           "postal_code": "11544",
//           "country_code": "GR"
//         }
//       },
//       "payments": {
//         "captures": [
//           {
//             "status": "COMPLETED",
//             "id": "28T42055CK290432X",
//             "final_capture": true,
//             "create_time": "2020-12-15T14:17:01Z",
//             "update_time": "2020-12-15T14:17:01Z",
//             "amount": {
//               "value": "0.01",
//               "currency_code": "USD"
//             },
//             "seller_protection": {
//               "status": "ELIGIBLE",
//               "dispute_categories": [
//                 "ITEM_NOT_RECEIVED",
//                 "UNAUTHORIZED_TRANSACTION"
//               ]
//             },
//             "links": [
//               {
//                 "href": "https://api.sandbox.paypal.com/v2/payments/captures/28T42055CK290432X",
//                 "rel": "self",
//                 "method": "GET",
//                 "title": "GET"
//               },
//               {
//                 "href": "https://api.sandbox.paypal.com/v2/payments/captures/28T42055CK290432X/refund",
//                 "rel": "refund",
//                 "method": "POST",
//                 "title": "POST"
//               },
//               {
//                 "href": "https://api.sandbox.paypal.com/v2/checkout/orders/0M247592PN062493K",
//                 "rel": "up",
//                 "method": "GET",
//                 "title": "GET"
//               }
//             ]
//           }
//         ]
//       }
//     }
//   ],

//   "links": [
//     {
//       "href": "https://api.sandbox.paypal.com/v2/checkout/orders/0M247592PN062493K",
//       "rel": "self",
//       "method": "GET",
//       "title": "GET"
//     }
//   ]
// }


// DATA
// {
//   "orderID": "0M247592PN062493K",
//   "payerID": "UD5HMEXRB7EV2",
//   "paymentID": null,
//   "billingToken": null,
//   "facilitatorAccessToken": "A21AAKMYjS3gJJkRJqLFokr-Hv1qaHxkDAeOlK3xe8zpJrV73w3UiEFwuw1Kg4rxb1oA8HSI71_UEnnQUIFO5Y9C0hdfztbCQ"
// }

// ACTIONS

// {
//   "orderID": "0M247592PN062493K",
//   "payerID": "UD5HMEXRB7EV2",
//   "paymentID": null,
//   "billingToken": null,
//   "facilitatorAccessToken": "A21AAKMYjS3gJJkRJqLFokr-Hv1qaHxkDAeOlK3xe8zpJrV73w3UiEFwuw1Kg4rxb1oA8HSI71_UEnnQUIFO5Y9C0hdfztbCQ"
// }


