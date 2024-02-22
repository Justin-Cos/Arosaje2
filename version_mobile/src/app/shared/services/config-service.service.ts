import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {
  static readonly mobileConfig = { slidesToShow: 1, slidesToScroll: 1 };
  static readonly desktopConfig = { slidesToShow: 4, slidesToScroll: 4 };

  getSlides(): any {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      return ConfigServiceService.mobileConfig;
    } else {
      return ConfigServiceService.desktopConfig;
    }
  }

  constructor() { }
}
