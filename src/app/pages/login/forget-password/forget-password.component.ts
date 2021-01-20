import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['../login.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  message: string = null;
  emailControl: FormControl;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.emailControl = new FormControl(null,  [Validators.required, Validators.email]);
  }

  submit(): void {
    if (this.emailControl.invalid) return;
    this.isLoading = true;
    const email = this.emailControl.value;
    console.log(email);
    this.authService
      .getForgattenPasswordCode(email)
      .subscribe(response => {
        this.message = response.message;
        this.isLoading = false;
      },
      errorMessage => {
        this.message = errorMessage;
        this.isLoading = false;
      }
    );
  }

}
