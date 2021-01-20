import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user/user';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/store/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  bookingSearchForm: FormGroup;
  searchMode = true;
  bookingIsInvalid = false;
  emailIsInvalid = false;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private store: Store<fromApp.AppState>){}

  ngOnInit(): void {

    this.bookingSearchForm = this.fb.group({
      email: this.fb.control(null, [Validators.required, Validators.email]),
      bookingId : this.fb.control(null, [Validators.required])
    })
  }

  onSubmit(){
    this.bookingSearchForm.controls['email'].invalid ? this.emailIsInvalid = true : this.emailIsInvalid = false;
    this.bookingSearchForm.controls['bookingId'].invalid ? this.bookingIsInvalid = true : this.bookingIsInvalid = false;
    if (this.bookingSearchForm.invalid) return;
    this.store.dispatch(new AuthActions.AddBookingParameters({
      email : this.bookingSearchForm.value.email,
      bookingId : this.bookingSearchForm.value.bookingId
    }));
    this.router.navigate(['user-booking']);
  }

  toggleSearchMode(){
    this.searchMode = !this.searchMode;
  }

}
