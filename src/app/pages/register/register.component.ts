import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/common/country';
import { UserInfo } from 'src/app/shared/models/user/user-info';
import { AuthService } from 'src/app/services/auth.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
  providers:  [ CountryService ]
})
export class RegisterComponent implements OnInit {

  singUpForm: FormGroup;
  // isAutheticated: boolean;
  isLoading: boolean = false;
  message: string = null;
  countries: Country [];

  // approvePassword: boolean = false;

  isRegistrationSuccessful = false;

  constructor(private authService: AuthService, private staticDataService: CountryService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.countries = this.staticDataService.getCountries();
    this.singUpForm = this.fb.group({
      name: this.fb.control(null, Validators.required),
      lastName: this.fb.control(null, Validators.required),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required, Validators.min(4), Validators.maxLength(30)]),
      repeatPassword: this.fb.control(null, [Validators.required, Validators.min(4), Validators.maxLength(30)]),
      telephoneNumber: this.fb.control(null),
      address: this.fb.control(null),
      city: this.fb.control(null),
      country: this.fb.control(null),
      zipCode: this.fb.control(null),
      subscribe: this.fb.control(false)
    });
  }

  // sign up ///
  onRegistrationSubmit(): void {
    this.singUpForm.markAsTouched();
    if (this.singUpForm.invalid) return;
    this.isLoading = true;
    const userInfo: UserInfo = {
      firstName : this.capitalize(this.singUpForm.value.name),
      lastName: this.capitalize(this.singUpForm.value.lastName),
      email : this.singUpForm.value.email.toLowerCase(),
      password : this.singUpForm.value.password,
      phone : this.singUpForm.value.telephoneNumber,
      address : this.singUpForm.value.address ? this.singUpForm.value.address.toUpperCase() : null,
      city: this.singUpForm.value.city ? this.singUpForm.value.city.toUpperCase() : null,
      country: this.singUpForm.value.country,
      zipCode: this.singUpForm.value.zipCode,
      subscribe: this.singUpForm.value.subscribe
    };

    console.log('userInfo', userInfo);
    this.authService.register(userInfo).subscribe(
      response => {
        console.log(response);
        if (response.status){
          this.isRegistrationSuccessful = true;
          // Basarili kayittan sonra islemin basarili oldugu ayni ekranda musteriye bildirilecek,
          // OK benzeri bir butonla route calisacak.
          // this.router.navigate(['/home']);
          this.message = response.message;
        } else {
          // this.singUpForm.reset();
          this.message = response.message;
        }
        this.isLoading = false;
      },
      errRes => {
        this.message = errRes;
        this.isLoading = false;
      }
    );

  }

  capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

  socialClicked(social:string){
    console.log(social);
  }

}
