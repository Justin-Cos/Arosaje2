import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from "./carousel/carousel.component";
import { ProfilesCarouselComponent } from "./carousel/profiles-carousel/profiles-carousel.component";
import { NextCareSessionsCarouselComponent } from "./carousel/next-care-sessions-carousel/next-care-sessions-carousel.component";
import { ButtonModule } from "primeng/button";
import { FooterComponent } from '../layout/footer.component';
import {MapComponent} from "../map/map.component";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/ressources/user.service";
import {FormBuilder} from "@angular/forms";
import {UserModel} from "../../shared/models/user.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, NextCareSessionsCarouselComponent, ProfilesCarouselComponent, ButtonModule, FooterComponent, MapComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./carousel/carousel.component.css']
})
export class HomeComponent {
  constructor(protected authService: AuthService,private  userService: UserService, private fb: FormBuilder) {
  }
}
