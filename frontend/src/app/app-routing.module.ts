import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'poke', component: HomeComponent },
  { path: 'poke/login', component: LoginPageComponent },
  { path: 'poke/register', component: SignupPageComponent },
  { path: '**', redirectTo: 'poke' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
