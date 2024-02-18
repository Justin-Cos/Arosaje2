import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {MapComponent} from "./map/map.component";
import {ProfileComponent} from "./profile/profile.component";
import {ErrorComponent} from "./error/error.component";
import {PublicationFormComponent} from "./publication-form/publication-form.component";
import {AuthGuard} from "./services/auth-guard.service";

export const routes: Routes = [
  { path: 'profile/:user_id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'publication', component: PublicationFormComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' },
];
