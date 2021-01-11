import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignupInformation } from 'src/app/models/signup-information.model';
import * as AuthActions from '../../../../store/auth/auth.actions';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  emailErrorMessage = "Please enter a valid email.";
  passwordErrorMessage = "Please enter a valid password.";

  constructor(private store: Store) { }

  ngOnInit(): void { }

  onSignup(signupForm: NgForm) {
    if (signupForm.invalid) return;
    const signupInformation: SignupInformation = {
      email: signupForm.value.email,
      password: signupForm.value.password
    };
    this.store.dispatch(AuthActions.signup({ signupInformation }));
  }
}

