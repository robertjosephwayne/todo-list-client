import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export type DrawerMode = 'side' | 'over';

export interface SidenavState {
  drawerOpen: boolean;
  drawerMode: DrawerMode;
  projectListOpen: boolean;
}

const initialState: SidenavState = {
  drawerOpen: false,
  drawerMode: 'side',
  projectListOpen: false,
};

@Injectable()
export class SidenavStore extends ComponentStore<SidenavState> {
  constructor() {
    super(initialState);
  }

  readonly drawerMode$ = this.select(state => state.drawerMode);
  readonly drawerOpen$ = this.select(state => state.drawerOpen);
  readonly projectListOpen$ = this.select(state => state.projectListOpen);

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
      drawerOpen: !state.drawerOpen
    };
  });

  readonly setDrawerMode = this.updater((state, drawerMode: DrawerMode) => {
    return {
      ...state,
      drawerMode
    };
  });

  readonly toggleProjectList = this.updater((state) => {
    return {
      ...state,
      projectListOpen: !state.projectListOpen
    };
  });
}
