import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import { FileUploadModule } from 'primeng/fileupload';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
