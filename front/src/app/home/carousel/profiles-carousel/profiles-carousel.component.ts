import { Component } from '@angular/core';
import {CarouselComponent} from "../carousel.component";

@Component({
  selector: 'app-profiles-carousel',
  standalone: true,
  imports: [
    CarouselComponent
  ],
  templateUrl: './profiles-carousel.component.html',
  styleUrl: './profiles-carousel.component.css'
})
export class ProfilesCarouselComponent {
  title = "Botanistes"
  slides = [
    {
      img: "assets/uploads/users_profile_pictures/john_doe.jpg",
      nom:"dih",
      bio:"dzd"
    },
  ];
}
