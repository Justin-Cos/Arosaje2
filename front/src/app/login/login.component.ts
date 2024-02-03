import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {UserService} from "../services/ressources/user.service";
import {MessageModule} from "primeng/message";
import {NgIf} from "@angular/common";
import {HttpHeaders} from "@angular/common/http";
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

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
  styleUrls: ['./login.component.scss']})
export class LoginComponent {
  error_message: string = ""
  username: any;
  password: string | undefined;
  constructor(private userService: UserService, private router: Router, private authService: AuthService) {
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
          console.log(error);
          this.error_message = error.message;
        }
      );
    }
  }
}
