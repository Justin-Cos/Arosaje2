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
      img: "assets/uploads/users_profile_pictures/th.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_profile_pictures/th1.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_profile_pictures/th2.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_profile_pictures/th3.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_profile_pictures/th4.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_profile_pictures/th5.jpg",
      nom:"dih",
      bio:"dzd"
    },
  ];
}
