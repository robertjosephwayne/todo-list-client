import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../store/auth/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate {
  isAuth: boolean;

  constructor(
    private router: Router,
    private store: Store
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    this.updateAuthStatus();
    if (!this.isAuth) {
      this.router.navigate(['/login']);
    }
    return this.isAuth;
  }

  private updateAuthStatus(): void {
    this.isAuth = !!localStorage.getItem('jwtToken');
    if (this.isAuth) {
      this.store.dispatch(AuthActions.syncLocalStorageToken());
    }
  }
}
