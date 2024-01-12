// Importez les modules nécessaires
import { Component, OnInit } from '@angular/core';

// Déclarez la bibliothèque OwlCarousel
declare var $: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Initialisez le carousel une fois que la vue est prête
    $(document).ready(() => {
      $('.owl-carousel').owlCarousel({
        items: 3, // Nombre d'éléments affichés à la fois
        loop: false, // Boucler le carousel
        margin: 10, // Marge entre les éléments
        nav: true, // Afficher les boutons de navigation
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 3
          },
          1000: {
            items: 5
          }
        }
      });
    });
  }
}
