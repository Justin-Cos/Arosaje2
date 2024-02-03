import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(protected authService: AuthService) {
  }
  items: any[] = []; // Define your items array

  menuVertical() {
    const navbar = document.getElementById('navbar-laterale')!;
    const fixe = document.getElementById('fixe')!;
    const body = document.getElementById('content')!;

    navbar.classList.remove('w-0');
    navbar.classList.add('w-60');
    body.classList.add('brightness-60');
    fixe.classList.add('brightness-60');

    body.addEventListener('click', function () {
      navbar.classList.add('w-0');
      navbar.classList.remove('w-60');
      body.classList.remove('brightness-60');
      fixe.classList.remove('brightness-60');
    });
  }

  protected readonly ApiService = ApiService;
}
