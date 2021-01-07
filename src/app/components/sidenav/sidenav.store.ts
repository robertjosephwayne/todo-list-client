import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export type DrawerMode = 'side' | 'over';

export interface SidenavState {
  isOpen: boolean;
  drawerMode: DrawerMode;
}

const initialState: SidenavState = {
  isOpen: false,
  drawerMode: 'side'
};

@Injectable({ providedIn: 'root' })
export class SidenavStore extends ComponentStore<SidenavState> {
  constructor() {
    super(initialState);
  }

  readonly isOpen$: Observable<boolean> = this.select(state => state.isOpen);
  readonly drawerMode$: Observable<string> = this.select(state => state.drawerMode);

  readonly openDrawer = this.updater((state) => {
    return {
      ...state,
      isOpen: true
    };
  });

  readonly closeDrawer = this.updater((state) => {
    return {
      ...state,
      isOpen: false
    };
  });

  readonly toggleDrawer = this.updater((state) => {
    return {
      ...state,
      isOpen: !state.isOpen
    };
  });

  readonly setDrawerMode = this.updater((state, drawerMode: DrawerMode) => {
    return {
      ...state,
      drawerMode
    };
  });
}
