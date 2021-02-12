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
    localStorage.setItem('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvYmVydEByb2JlcnQuY29tIiwic3ViIjoiNjAxZjc2YjA0ODdiMTIxZWMyMjc1YjJhIiwiaWF0IjoxNjEzMTExNTUzLCJleHAiOjE2MTMxMTE2MTN9.FjXmCokNQyZcl6zDFC0oBPax-p0aey9238sZnRLnVfs');
    this.isAuth = !!localStorage.getItem('jwtToken');
    if (this.isAuth) {
      this.store.dispatch(AuthActions.syncLocalStorageToken());
    }
  }
}
