import { HttpClient } from '@angular/common/http';
import { COMPILER_OPTIONS, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/store/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/app-models/user';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css'],
})
export class AllBookingsComponent implements OnInit {

  user: User;
  errorMessage: string;
  isLoading = false;
  userBookings: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.userSub = this.store
    //   .select('auth')
    //   .subscribe((authState) => {
    //     this.user = authState.user;
    //     this.userBookings = authState.allBookings;
    //   });
    this.store
      .select('auth')
      .subscribe((authState) =>  {
          this.user = authState.user;
          this.userBookings = authState.allBookings;
        }
      ).unsubscribe();

    if (!this.userBookings) {
      this.isLoading = true;
      this.authService.getUsersAllBookings().subscribe(
        (response) => {
          console.log(response);
          this.userBookings = response;
          this.store.dispatch(new AuthActions.AddAllBookings(response));
          this.isLoading = false;
        },
        (errorMessage) => {
          this.errorMessage = errorMessage;
          console.log(this.errorMessage);
          this.isLoading = false;
        }
      );
    }
  }

  onTripClick(bookingId: number) {
    this.store.dispatch(new AuthActions.AddBookingParameters({email: this.user.email, bookingId: bookingId}))
    this.router.navigate(['/user-booking']);
  }
}
