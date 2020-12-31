import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { TodoListEditorComponent } from './components/todo-list-editor/todo-list-editor.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: TodoListEditorComponent, canActivate: [AuthGuard] },
  { path: 'edit/:todoId', component: TodoListEditorComponent, canActivate: [AuthGuard] },
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
