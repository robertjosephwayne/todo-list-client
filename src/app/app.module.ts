import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { appReducer } from './store/app.reducer';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/sidenav/auth/login/login.component';
import { TodoItemComponent } from './components/sidenav/todo-list/todo-item/todo-item.component';
import { TodoListComponent } from './components/sidenav/todo-list/todo-list.component';
import { TodoListEditorComponent } from './components/sidenav/todo-list/todo-list-editor/todo-list-editor.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthEffects } from './store/auth/auth.effects';
import { SignupComponent } from './components/sidenav/auth/signup/signup.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SidenavDrawerComponent } from './components/sidenav/sidenav-drawer/sidenav-drawer.component';
import { NewProjectDialogComponent } from './components/sidenav/sidenav-drawer/new-project-dialog/new-project-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoListEditorComponent,
    SidenavComponent,
    SidenavDrawerComponent,
    NewProjectDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    BrowserAnimationsModule,
    MaterialModule,
    EffectsModule.forRoot([
      AuthEffects
    ]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
