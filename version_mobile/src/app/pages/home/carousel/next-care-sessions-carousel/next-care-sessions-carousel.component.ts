import {Component, OnInit} from '@angular/core';
import {CarouselComponent} from "../carousel.component";
import {ApiService} from "../../../../shared/services/api.service";
import {CareSessionService} from "../../../../shared/services/ressources/care-session.service";
import {CareSessionModel} from "../../../../shared/models/care-session.model";
import {PlantModel} from "../../../../shared/models/plant.model";
import {PlantService} from "../../../../shared/services/ressources/plant.service";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-next-care-sessions-carousel',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './next-care-sessions-carousel.component.html',
})
export class NextCareSessionsCarouselComponent implements OnInit {
  constructor(private CareSessionService: CareSessionService, private PlantService: PlantService) {
  }

  title: string = "Plantes à garder près de chez vous";
  slides: { img: string; nom: string; bio: string; }[] = [];
  nextCareSessions: CareSessionModel[] = [];


  ngOnInit() {
    this.CareSessionService.getAvailableCareSessions().subscribe((nextCareSessions: any[] ) => {
      this.nextCareSessions = nextCareSessions;
      this.slides = nextCareSessions.map((nextCareSessions, index) => {
        return {
          link: `/care-session/${nextCareSessions.careSession.session_id}`,
          img: `${ApiService.baseUrl}/uploads/plants/${nextCareSessions.plant.image}`,
          nom: nextCareSessions.plant.name,
          bio: `${nextCareSessions.careSession.date_start} - ${nextCareSessions.careSession.date_end}`,
        };
      });
    });
  }
}
