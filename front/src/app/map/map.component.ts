import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, NavigationControl, Marker } from 'maplibre-gl';
import {MarkerComponent} from "@maplibre/ngx-maplibre-gl";
import {CareSessionService} from "../services/ressources/care-session.service";
import {AddressService} from "../services/ressources/address.service";
import {AddressModel} from "../models/address.model";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  imports: [
    MarkerComponent
  ],
  styleUrls: ['./map.component.scss']
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
          new Marker({color: "#FF0000"})
            .setLngLat([location.longitude, location.latitude])
            .addTo(<Map>this.map);
        });
        new Marker({color: "#00FF00"})
          .setLngLat([userAdress.longitude ?? 0, userAdress.latitude ?? 0])
          .addTo(<Map>this.map);
      });
    }
  }

  ngOnDestroy() {
    this.map?.remove();
  }

}
