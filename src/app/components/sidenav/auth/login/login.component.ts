import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../store/auth/auth.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailControlSyncValidators = [
    Validators.required,
    Validators.email
  ];
  emailControlConfig = {
    validators: this.emailControlSyncValidators
  };
  passwordControlSyncValidators = [
    Validators.required,
  ];
  passwordControlConfig = {
    validators: this.passwordControlSyncValidators
  };
  loginForm = this.fb.group({
    email: ['', this.emailControlConfig],
    password: ['', this.passwordControlConfig]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) { }

  ngOnInit(): void { }

  onLogin() {
    this.store.dispatch(AuthActions.login({
      loginCredentials: this.loginForm.value
    }));
  }

  // TODO: Show password

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}

