// TODO: Add automatic login after signup
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createPasswordStrengthValidator } from 'src/app/validators/password-strength.validator';
import * as AuthActions from '../../../../store/auth/auth.actions';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  emailControlSyncValidators = [
    Validators.required,
    Validators.email
  ];
  emailControlConfig = {
    validators: this.emailControlSyncValidators,
    updateOn: 'blur'
  };
  passwordControlSyncValidators = [
    Validators.required,
    Validators.minLength(8),
    createPasswordStrengthValidator()
  ];
  passwordControlConfig = {
    validators: this.passwordControlSyncValidators
  };
  signupForm = this.fb.group({
    email: ['', this.emailControlConfig],
    password: ['', this.passwordControlConfig]
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void { }

  onSignup() {
    this.store.dispatch(AuthActions.signup({
      signupInformation: this.signupForm.value
    }));
  }

  // TODO: Show password

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

}

