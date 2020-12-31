import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';

import * as fromAuth from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  label = "To-Do List";
  isAuth$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.setAuthState();
  }

  setAuthState(): void {
    this.isAuth$ = this.store.select(fromAuth.selectIsAuth);
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
