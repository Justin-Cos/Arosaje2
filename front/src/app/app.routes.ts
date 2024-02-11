import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {MapComponent} from "./map/map.component";
import {ProfileComponent} from "./profile/profile.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:user_id', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
