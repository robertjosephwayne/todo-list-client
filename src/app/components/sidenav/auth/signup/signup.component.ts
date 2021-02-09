// TODO: Add automatic login after signup
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../../store/auth/auth.actions';
import * as fromAuth from '../../../../store/auth/auth.selectors';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading$: Observable<boolean>;

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
    Validators.minLength(8)
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

  ngOnInit(): void {
    this.setAuthData();
  }

  setAuthData() {
    this.isLoading$ = this.store.select(fromAuth.selectIsLoading);
  }

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

