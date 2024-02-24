import { Component, Input } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';
import {ConfigServiceService} from "../../../shared/services/config-service.service";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [SlickCarouselModule, CommonModule, MatDividerModule, DividerModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() slides: any[] = [];
  @Input() title: string = "";

  slideConfig: any;

  constructor(private configService: ConfigServiceService) {
    this.slideConfig = this.configService.getSlides();
  }

  hoveredItemIndex: any;

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  protected readonly console = console;
}
