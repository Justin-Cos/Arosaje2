import {Component, ViewChild} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FileUpload, FileUploadModule} from 'primeng/fileupload';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../services/ressources/user.service";
import {ToastModule} from "primeng/toast";
import {NgIf} from "@angular/common";
import {MessageModule} from "primeng/message";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    NgIf,
    MessageModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild('fileUpload') fileUpload: FileUpload | undefined;
  bio: any;
  email: any;
  password: any;
  username: any;
  tried_once: boolean = false;
  error_username: boolean = false;
  error_email: boolean = false;
  error_password: boolean = false;
  error_file: boolean = false;
  error_message: string = "";

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
  }

  onSubmit(registerForm: NgForm) {
    this.tried_once = true;
    if (registerForm.valid) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      const usernameRegex = /^[a-zA-Z0-9_-]+$/;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      this.error_username = !usernameRegex.test(this.username);
      this.error_email = !emailRegex.test(this.email);
      this.error_password = !passwordRegex.test(this.password);
      this.error_file = this.fileUpload?.files.length === 0;
      if (this.error_username || this.error_email || this.error_password || this.error_file) {
        return;
      }
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('email', this.email);
      formData.append('bio', this.bio);
      formData.append('password', this.password);

      if (this.fileUpload && this.fileUpload.files.length > 0) {
        formData.append('image_file', this.fileUpload.files[0]);
      }
      this.userService.register(formData).subscribe(
        (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/home']);
        },
        (error) => {
          this.error_message = error.error.message;
        }
      );
    }
  }
}
