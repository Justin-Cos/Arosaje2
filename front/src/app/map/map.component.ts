import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, NavigationControl, Marker, Popup } from 'maplibre-gl';
import {CareSessionService} from "../services/ressources/care-session.service";
import {AddressService} from "../services/ressources/address.service";
import {AddressModel} from "../models/address.model";
import {AuthService} from "../services/auth.service";
import {CareSessionModel} from "../models/care-session.model";
import {fr} from "date-fns/locale";
import {format} from "date-fns";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  private userAdressLat: number = 0;
  private userAdressLong: number = 0;

  constructor(private careSessionService: CareSessionService, private addressService: AddressService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const initialState = { lng: this.userAdressLong, lat: this.userAdressLat , zoom: 10 };

    let userAdresses: AddressModel[] = this.authService.getAddresses() ?? [];
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=QVXST2w7a0YlOzOVek3p`,
      center: [userAdresses[0].longitude ?? 0, userAdresses[0].latitude ?? 0],
      zoom: initialState.zoom
    });

    for (const userAdress of userAdresses) {
      this.careSessionService.getNearbyCareSessions(userAdress.address_id.toString(), "350").subscribe((careSessions) => {
        careSessions.forEach((careSession: any) => {
          const location = careSession.address;
          new Marker({color: "#2df600"})
            .setLngLat([location.longitude, location.latitude])
            .setPopup(new Popup().setHTML(`
            <a href="/care-session/${careSession.id}">
              <h2>
                ${careSession.plant.name}
              </h2>
              <p>
                 ${format(careSession.careSession.date_start, 'EEEE d MMMM yyyy', { locale: fr })} - ${format(careSession.careSession.date_end, 'EEEE d MMMM yyyy', { locale: fr })}
              </p>
            </a>

            `))
            .addTo(<Map>this.map);
        });
        new Marker({color: "#ff0000"})
          .setLngLat([userAdress.longitude ?? 0, userAdress.latitude ?? 0])
          .setPopup(new Popup().setHTML("<h1>"+ userAdress.address + "</h1>"))
          .addTo(<Map>this.map);
      });
    }
  }

  ngOnDestroy() {
    this.map?.remove();
  }

}
