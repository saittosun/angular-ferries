import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxStripeModule } from 'ngx-stripe';
import { DropdownDirective } from '../app/shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './booking/booking.component';
import { InfoComponent } from './booking/info/info.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { StripeComponent } from './booking/payment/stripe/stripe.component';
import { PassengerCountComponent } from './booking/search/passenger-count/passenger-count.component';
import { RoutesComponent } from './booking/search/routes-component/routes.component';
import { SearchComponent } from './booking/search/search.component';
import { TripDateComponent } from './booking/search/trip-date/trip-date.component';
import { TripKindComponent } from './booking/search/trip-kind/trip-kind.component';
import { AccommodationSelectComponent } from './booking/select/passenger-select/accommodation-select/accommodation-select.component';
import { PassengerDiscountSelectComponent } from './booking/select/passenger-select/passenger-discount-select/passenger-discount-select.component';
import { PassengerSelectComponent } from './booking/select/passenger-select/passenger-select.component';
import { SelectComponent } from './booking/select/select.component';
import { SelectedTripComponent } from './booking/select/selected-trip/selected-trip.component';
import { VehicleSelectComponent } from './booking/select/vehicle-select/vehicle-select.component';
import { HomeComponent } from './home/home.component';
import { MaterialsModule } from './moduls/material.module';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminBookingsComponent } from './pages/admin/admin-bookings/admin-bookings.component';
import { AllUsersComponent } from './pages/admin/all-users/all-users.component';
import { BlogComponent } from './pages/blog/blog.component';
import { FaqComponent } from './pages/faq/faq.component';
import { GetInTouchComponent } from './pages/get-in-touch/get-in-touch.component';
import { ForgetPasswordComponent } from './pages/login/forget-password/forget-password.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AllBookingsComponent } from './pages/user/all-bookings/all-bookings.component';
import { SettingsComponent } from './pages/user/settings/settings.component';
import { UserBookingComponent } from './pages/user/user-booking/user-booking.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { LoadingSpinnerComponent } from './shared/base-components/loading-spinner/loading-spinner.component';
import { LocationPipe } from './shared/pipes/location.pipe';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './store/auth-store/auth.effects';
import { BookingEffects } from './store/booking-store/booking.effects';
import { AlertComponent } from './shared/base-components/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BookingComponent,
    FooterComponent,
    AboutUsComponent,
    FaqComponent,
    BlogComponent,
    GetInTouchComponent,
    SelectComponent,
    SearchComponent,
    InfoComponent,
    SelectedTripComponent,
    LocationPipe,
    PaymentComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    LoadingSpinnerComponent,
    UserBookingComponent,
    AllBookingsComponent,
    SettingsComponent,
    DropdownDirective,
    AdminBookingsComponent,
    AllUsersComponent,
    RoutesComponent,
    TripKindComponent,
    PassengerCountComponent,
    TripDateComponent,
    VehicleSelectComponent,
    AccommodationSelectComponent,
    PassengerSelectComponent,
    PassengerDiscountSelectComponent,
    StripeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    MaterialsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, // TOTO delete this
    BrowserAnimationsModule,
    HttpClientModule,
    NgxMatSelectSearchModule,
    NgxPayPalModule,
    NgxStripeModule.forRoot('pk_test_51I85NNAJV9TUrw8POSQFKdVfVIae8qQguHer5YzeJT5QXxiOJizepSNTr2GeiZ82FhNgG7y2xZcB8UQ2yeQF1u8j00jHRZvv6O'),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, BookingEffects])
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
