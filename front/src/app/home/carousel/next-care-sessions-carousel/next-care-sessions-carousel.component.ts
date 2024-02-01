import {Component, OnInit} from '@angular/core';
import {CarouselComponent} from "../carousel.component";
import {ApiService} from "../../../services/api.service";
import {CareSessionService} from "../../../services/ressources/care-session.service";
import {CareSessionModel} from "../../../models/care-session.model";
import {PlantModel} from "../../../models/plant.model";
import {PlantService} from "../../../services/ressources/plant.service";
import { forkJoin } from 'rxjs';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
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
    this.CareSessionService.getAvailableCareSessions().subscribe((nextCareSessions: CareSessionModel[]) => {
      this.nextCareSessions = nextCareSessions;

      const observables = this.nextCareSessions.map(nextCareSession =>
        this.PlantService.getPlantById(nextCareSession.plant)
      );

      forkJoin(observables).subscribe((plants: PlantModel[]) => {
        this.slides = plants.map((plant, index) => {
          return {
            img: `${ApiService.baseUrl}/uploads/plants/${plant.image}`,
            nom: plant.name,
            bio: `${format(nextCareSessions[index].date_start, 'EEEE d MMMM yyyy', { locale: fr })} -
            ${format(nextCareSessions[index].date_end, 'EEEE d MMMM yyyy', { locale: fr })}`,
          };
        });
      });
    });
  }
}