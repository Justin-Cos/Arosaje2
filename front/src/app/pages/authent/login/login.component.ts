import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {UserService} from "../../../shared/services/ressources/user.service";
import {MessageModule} from "primeng/message";
import {NgIf} from "@angular/common";
import {AuthService} from "../../../shared/services/auth.service";

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
  styleUrls: ['../authent.scss']
})
export class LoginComponent {
  errorMessage: string = ""
  username: any;
  password: string | undefined;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {
  }


  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const jsonData = {username: this.username, password: this.password};
      this.userService.login(jsonData).subscribe(
        (res: any) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/home']);
        },
        (error: any) => {
          this.errorMessage = error.message;
        }
      );
    }
  }
}
