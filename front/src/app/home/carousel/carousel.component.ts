import {Component, Input} from '@angular/core';
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

  @Input() slides: any[] = [];


  slideConfig = {"slidesToShow": 7, "slidesToScroll": 4};
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

