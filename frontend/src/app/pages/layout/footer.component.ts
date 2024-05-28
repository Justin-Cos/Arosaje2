import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/ressources/user.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(protected authService: AuthService,private  userService: UserService, private fb: FormBuilder) {
  }
  onLogoutClick() {
    this.authService.logout();
  }
}
