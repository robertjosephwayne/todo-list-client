import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../store/auth/auth.actions';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailErrorMessage = "Please enter a valid email.";
  passwordErrorMessage = "Please enter a valid password.";

  constructor(private store: Store) { }

  ngOnInit(): void { }

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) return;
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    const loginCredentials = {
      email: loginForm.value.email,
      password: loginForm.value.password
    };
    this.store.dispatch(AuthActions.login({ loginCredentials }));
  }
  
}

