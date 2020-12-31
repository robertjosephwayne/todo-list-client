import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';

import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  label = "To-Do List";

  constructor(private store: Store) { }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
