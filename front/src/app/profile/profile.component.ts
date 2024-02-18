import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/ressources/user.service";
import {CarouselComponent} from "../home/carousel/carousel.component";
import {CarouselModule} from "primeng/carousel";
import {ButtonModule} from "primeng/button";
import {ApiService} from "../services/api.service";
import {AvatarModule} from "primeng/avatar";
import {PlantModel} from "../models/plant.model";
import {UserModel} from "../models/user.model";
import {PlantService} from "../services/ressources/plant.service";
import {CareSessionService} from "../services/ressources/care-session.service";
import {CareSessionModel} from "../models/care-session.model";
import {DialogModule} from "primeng/dialog";
import {PlantFormComponent} from "./form-modal/plant-form/plant-form.component";
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CarouselComponent,
    CarouselModule,
    ButtonModule,
    AvatarModule,
    DialogModule,
    PlantFormComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: UserModel;
  plants: PlantModel[] = []
  availableCareSessions: CareSessionModel[] = [];
  careTakerExperiences: CareSessionModel[] = [];
  protected readonly ApiService = ApiService;
  displayPlantForm: boolean = false;

  constructor(private route: ActivatedRoute, public authService: AuthService, private router: Router, private userService: UserService, private plantService: PlantService, private careSessionService: CareSessionService) {
  }
  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          const user_id = params['user_id'];
          return this.userService.getUserById(user_id);
        })
      )
      .subscribe(user => {
      if (user === null) {
        this.router.navigate(['/error']);
      }
      this.user = user;
      this.plantService.getPlantsByUserId(this.user.user_id).subscribe((plants) => {
        this.plants = plants;
      });
      this.careSessionService.getAvailableCareSessions(this.user.user_id).subscribe((careSessions) => {
        this.availableCareSessions = careSessions;
      })
      this.careSessionService.getPreviousCareSession(true, this.user.user_id).subscribe((careTakerExperiences) => {
        this.careTakerExperiences = careTakerExperiences;
      })
    });
  }

  openPlantForm() {
    this.displayPlantForm = true;
  }
}
