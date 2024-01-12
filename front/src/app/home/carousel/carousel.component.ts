import { Component } from '@angular/core';
import {SlickCarouselModule} from "ngx-slick-carousel";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [SlickCarouselModule,CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  slides = [
    {
      img: "http://placehold.it/350x150/000000",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "http://placehold.it/350x150/111111" ,
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "http://placehold.it/350x150/333333",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "http://placehold.it/350x150/666666",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/picture/profile_pic/th.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/picture/profile_pic/th1.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/picture/profile_pic/th2.jpg",
      nom:"dih",
      bio:"dzd"
    },
    {
      img: "assets/picture/profile_pic/th3.jpg",
      nom:"dih",
      bio:"dzd"
    },
  ];
  slideConfig = {"slidesToShow": 7, "slidesToScroll": 1};
  hoveredItemIndex: any;

  addSlide() {
    this.slides.push({
      img: "assets/picture/profile_pic/th3.jpg",
      nom:"dih",
      bio:"dzd"
    })
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  protected readonly console = console;
}

