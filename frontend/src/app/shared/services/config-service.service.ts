import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {
  static readonly mobileConfig = { slidesToShow: 1, slidesToScroll: 1 };
  static readonly desktopConfig = { slidesToShow: 4, slidesToScroll: 4 };

  static readonly desktopWidth = "w-65";
  static readonly mobileWidth = "w-100";

  static readonly desktopMenu = "flex-row";
  static readonly mobileMenu = "flex-top";

  getSlides(): any {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      return ConfigServiceService.mobileConfig;
    } else {
      return ConfigServiceService.desktopConfig;
    }
  }

  getWidthLogin(): any {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      return ConfigServiceService.mobileWidth;
    } else {
      return ConfigServiceService.desktopWidth;
    }
  }

  getWidthProfil(): any {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      return ConfigServiceService.mobileMenu;
    } else {
      return ConfigServiceService.desktopMenu;
    }
  }

  constructor() { }
}
