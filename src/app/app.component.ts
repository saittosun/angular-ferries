import { Component, OnInit } from '@angular/core';
import * as AuthActions from 'src/app/store/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import { StripeComponent } from './booking/payment/stripe/stripe.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'GreeceFerries';

  // customersPrice= 1.22;
  constructor(private store: Store,    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }

  // payWithCreditCard(){
  //   const dialogRef = this.dialog.open(StripeComponent, {
  //     data: {price: this.customersPrice}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //   });
  // }

}
