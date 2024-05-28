import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, NavigationControl, Marker, Popup } from 'maplibre-gl';
import {CareSessionService} from "../../shared/services/ressources/care-session.service";
import {AddressModel} from "../../shared/models/address.model";
import {AuthService} from "../../shared/services/auth.service";
import {ApiService} from "../../shared/services/api.service";



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

  constructor(private careSessionService: CareSessionService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const initialState = { lng: this.userAdressLong, lat: this.userAdressLat , zoom: 5 };

    let userAdresses: AddressModel[] = this.authService.getAddresses() ?? [];


    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=QVXST2w7a0YlOzOVek3p`,
      center: [userAdresses[0]?.longitude ?? 0, userAdresses[0]?.latitude ?? 0],
      zoom: initialState.zoom
    });

    for (const userAdress of userAdresses) {
      this.careSessionService.getNearbyCareSessions(userAdress.address_id.toString(), "350").subscribe((careSessions) => {
        careSessions.forEach((careSession: any) => {
          const location = careSession.address;

          new Marker({color: "#2df600"})
            .setLngLat([location.longitude, location.latitude])
            .setPopup(new Popup().setHTML(`
             <a href="/care-session/${careSession.careSession.session_id}">
                <div
                style="background-image:url('${ApiService.baseUrl}/uploads/plants/${careSession.plant.image}'); position: relative;width: 200px;height: 200px;background-size: cover;background-position: center;overflow: hidden;">
                <div style=" position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: flex;flex-direction: column;justify-content: center;align-items: center;transition: opacity 0.5s ease-in-out;color: white;text-align: center;font-size: 16px;padding: 10px;background-color: rgba(0, 0, 0, 0.5);text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">
                  <h3> ${careSession.plant.name}</h3>
                  <p>
                    Du ${new Date(careSession.careSession.date_start).toLocaleDateString()} au ${new Date(careSession.careSession.date_end).toLocaleDateString()}
                   </p>
                </div>
              </div>
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
