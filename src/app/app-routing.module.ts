import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { BlogComponent } from './pages/blog/blog.component';
import { FaqComponent } from './pages/faq/faq.component';
import { GetInTouchComponent } from './pages/get-in-touch/get-in-touch.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/login/forget-password/forget-password.component';
import { UserBookingComponent } from './pages/user/user-booking/user-booking.component';
import { AllBookingsComponent } from './pages/user/all-bookings/all-bookings.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SettingsComponent } from './pages/user/settings/settings.component';
import { AdminBookingsComponent } from './pages/admin/admin-bookings/admin-bookings.component';
import { AllUsersComponent } from './pages/admin/all-users/all-users.component';


const routes: Routes = [
  { path: 'admin', canActivate: [AuthGuard], children: [
    { path: 'bookings', component: AdminBookingsComponent },
    { path: 'users', component: AllUsersComponent },
  ]},
  { path: 'user', canActivate: [AuthGuard], children: [
    { path: 'settings', component: SettingsComponent },
    { path: 'all-bookings', component: AllBookingsComponent },
  ]},
  { path: 'user-booking', component: UserBookingComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'get-in-touch', component: GetInTouchComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
