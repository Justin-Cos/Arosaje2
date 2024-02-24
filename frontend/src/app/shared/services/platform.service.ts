import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  isMobile(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }
}
