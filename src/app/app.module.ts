import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/sidenav/auth/login/login.component';
import { SignupComponent } from './components/sidenav/auth/signup/signup.component';
import { NewProjectDialogComponent } from './components/sidenav/sidenav-drawer/new-project-dialog/new-project-dialog.component';
import { SidenavDrawerComponent } from './components/sidenav/sidenav-drawer/sidenav-drawer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CreateTodoDialogComponent } from './components/sidenav/todo-list/create-todo-dialog/create-todo-dialog.component';
import { EditTodoDialogComponent } from './components/sidenav/todo-list/edit-todo-dialog/edit-todo-dialog.component';
import { TodoItemComponent } from './components/sidenav/todo-list/todo-item/todo-item.component';
import { TodoListComponent } from './components/sidenav/todo-list/todo-list.component';
import { MaterialModule } from './material.module';
import { AuthInterceptor } from './services/auth-interceptor';
import { appReducer } from './store/app.reducer';
import { AuthEffects } from './store/auth/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    CreateTodoDialogComponent,
    EditTodoDialogComponent,
    HeaderComponent,
    LoginComponent,
    NewProjectDialogComponent,
    SidenavComponent,
    SidenavDrawerComponent,
    SignupComponent,
    TodoItemComponent,
    TodoListComponent,
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
