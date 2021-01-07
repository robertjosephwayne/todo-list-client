import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/sidenav/auth/login/login.component';
import { SignupComponent } from './components/sidenav/auth/signup/signup.component';
import { TodoListComponent } from './components/sidenav/todo-list/todo-list.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
