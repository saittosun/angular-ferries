import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/store/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/app-models/user';
import { PaginateModel } from 'src/app/models/app-models/paginate-model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css'],
})
export class AdminBookingsComponent implements OnInit {
  userSub: Subscription;
  user: User;
  errorMessage: string;
  isLoading = false;
  allBookings: PaginateModel;
  length: number;
  pageSize: number;
  pageIndex: number;
  pageSizeOptions = [10, 25, 50, 100];
  showFirstLastButtons = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.getAdminAllBookings().subscribe(
      (response) => this.subscribeResponse(response),
      errorMessage => this.subscribeError(errorMessage)
    );
  }

  handlePageEvent(event: PageEvent) {
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.isLoading = true;
    this.authService.paginateAdminAllUsers(this.allBookings.meta.links[this.pageIndex+1].url, this.pageSize)
      .subscribe(
        response => this.subscribeResponse(response),
        errorMessage => this.subscribeError(errorMessage)
      );
  }

  subscribeResponse(response){
    console.log(response);
    this.allBookings = response;
    this.store.dispatch(new AuthActions.AddAllUsers(response));
    this.length = this.allBookings.meta.total;
    this.pageSize = this.allBookings.meta.per_page;
    this.pageIndex = this.allBookings.meta.current_page-1;
    this.isLoading = false;
  }

  subscribeError(errorMessage){
    this.errorMessage = errorMessage;
    console.log(this.errorMessage);
    this.isLoading = false;
  }

  onTripClick(email: string, bookingId: number) {
    this.store.dispatch(new AuthActions.AddBookingParameters({email: email, bookingId: bookingId}));
    this.router.navigate(['user-booking']);
  }
}
