import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {UserService} from "../../../shared/services/ressources/user.service";
import {MessageModule} from "primeng/message";
import {NgIf} from "@angular/common";
import { Router } from '@angular/router';
import {AuthService} from "../../../shared/services/auth.service";
import {ConfigServiceService} from "../../../shared/services/config-service.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MessageModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['../authent.scss']})
export class LoginComponent {
  errorMessage: string = ""
  username: any;
  password: string | undefined;
  getWidthLogin = this.configService.getWidthLogin();
  constructor(private userService: UserService, private router: Router, private authService: AuthService, private configService: ConfigServiceService) {
  }


  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const jsonData = {  username: this.username, password: this.password };
      this.userService.login(jsonData).subscribe(
        (res: any) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/home']);
        },
        (error: any) => {
          if (error.status === 401) {
            this.errorMessage = "Mot de passe ou nom d'utilisateur incorrecte";
          } else {
            this.errorMessage = 'Erreur inconnue, veuillez réessayer plus tard.'
          }
        }
      );
    }
  }
}
