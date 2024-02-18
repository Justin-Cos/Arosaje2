import { Component } from '@angular/core';
import {CarouselComponent} from "./carousel/carousel.component";
import {ProfilesCarouselComponent} from "./carousel/profiles-carousel/profiles-carousel.component";
import {
  NextCareSessionsCarouselComponent
} from "./carousel/next-care-sessions-carousel/next-care-sessions-carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, NextCareSessionsCarouselComponent, ProfilesCarouselComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
}
