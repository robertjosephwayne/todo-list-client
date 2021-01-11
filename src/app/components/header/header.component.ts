import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../store/auth/auth.actions';
import * as fromAuth from '../../store/auth/auth.selectors';
import { SidenavStore } from '../sidenav/sidenav.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean>;

  constructor(
    private readonly sidenavStore: SidenavStore,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.setAuthState();
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  onMenuSelected(): void {
    this.sidenavStore.toggleDrawer();
  }

  setAuthState(): void {
    this.isAuth$ = this.store.select(fromAuth.selectIsAuth);
  }
  
}
