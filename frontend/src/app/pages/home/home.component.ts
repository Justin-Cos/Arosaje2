import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from "./carousel/carousel.component";
import { ProfilesCarouselComponent } from "./carousel/profiles-carousel/profiles-carousel.component";
import { NextCareSessionsCarouselComponent } from "./carousel/next-care-sessions-carousel/next-care-sessions-carousel.component";
import { ButtonModule } from "primeng/button";
import { FooterComponent } from '../layout/footer.component';
import {MapComponent} from "../map/map.component";
import {NgcCookieConsentModule } from 'ngx-cookieconsent';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, NextCareSessionsCarouselComponent, ProfilesCarouselComponent, ButtonModule, FooterComponent, MapComponent,NgcCookieConsentModule],
  templateUrl: './home.component.html',
  styleUrls: ['./carousel/carousel.component.css']
})
export class HomeComponent {

}
