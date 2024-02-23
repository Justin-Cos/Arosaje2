import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/authent/login/login.component";
import {RegisterComponent} from "./pages/authent/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {MapComponent} from "./pages/map/map.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ErrorComponent} from "./shared/error/error.component";
import {AuthGuard} from "./shared/services/auth-guard.service";
import {CareSessionComponent} from "./pages/care-session/care-session.component";

export const routes: Routes = [
  {path: 'profile/:user_id', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'care-session/:session_id', component: CareSessionComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'map', component: MapComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'error', component: ErrorComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/error'},
];
