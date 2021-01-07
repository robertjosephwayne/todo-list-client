import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void { }

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) return;
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    this.store.dispatch(AuthActions.login({ email, password }))
  }
}

