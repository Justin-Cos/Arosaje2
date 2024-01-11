import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {

  constructor(private renderer: Renderer2, private el: ElementRef) { }
  menuVertical() {
    const navbar = document.getElementById('navbar-laterale')!;
    const body = document.getElementById('content')!;
    navbar.classList.remove("w-0");
    navbar.classList.add("w-60");
    body.classList.add("brightness-60");
    body.addEventListener('click', function() {
      navbar.classList.add("w-0");
      navbar.classList.remove("w-60");
      body.classList.remove("brightness-60");
    });
  }
}
