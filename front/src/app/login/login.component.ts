import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {UserService} from "../services/ressources/user.service";
import {MessageModule} from "primeng/message";
import {NgIf} from "@angular/common";

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
  constructor(private userService: UserService) {
  }


  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const formData = new FormData();
      formData.append('username', this.username ?? '');
      formData.append('password', this.password ?? '');
      console.log("a: ",formData.get('username'), formData.get('password'));
      this.userService.login(formData).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
        },
        (error: any) => {
          console.log(error);
          this.error_message = error.message;
        }
      );
    }
  }
}
