import { Component } from '@angular/core';
import {CarouselComponent} from "./carousel/carousel.component";
import {PlantsCarouselComponent} from "./carousel/plants-carousel/plants-carousel.component";
import {ProfilesCarouselComponent} from "./carousel/profiles-carousel/profiles-carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, PlantsCarouselComponent, ProfilesCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
