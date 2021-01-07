import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';
import { SidenavStore } from '../sidenav/sidenav.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store,
    private readonly sidenavStore: SidenavStore
  ) { }

  ngOnInit(): void {
    this.setAuthState();
  }

  setAuthState(): void {
    this.isAuth$ = this.store.select(fromAuth.selectIsAuth);
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  onMenuSelected(): void {
    this.sidenavStore.toggleDrawer();
  }
}
