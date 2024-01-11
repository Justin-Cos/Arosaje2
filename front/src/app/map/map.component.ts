import { Component } from '@angular/core';
import {MenuModule} from "../menu/menu.module";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    MenuModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

}
