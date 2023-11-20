import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'main',
    component: MainComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
