import { Component } from '@angular/core';
import {CarouselComponent} from "../carousel.component";

@Component({
  selector: 'app-plants-carousel',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './plants-carousel.component.html',
  styleUrl: './plants-carousel.component.css'
})
export class PlantsCarouselComponent {
  title: string = "Plantes à garder près de chez vous";
  slides = [
    {
      img: "assets/uploads/users_plants_pictures/1.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_plants_pictures/2.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_plants_pictures/3.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_plants_pictures/4.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_plants_pictures/5.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_plants_pictures/6.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_plants_pictures/7.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_plants_pictures/8.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/uploads/users_plants_pictures/9.jpg",
      nom:"dih",
      bio:"dzd"
    },
  ];
}
