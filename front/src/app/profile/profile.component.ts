import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CarouselComponent,
    CarouselModule,
    ButtonModule,
    AvatarModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: UserModel;
  plants: PlantModel[] = []
  availableCareSessions: CareSessionModel[] = [];
  careTakerExperiences: CareSessionModel[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private userService: UserService, private plantService: PlantService, private careSessionService: CareSessionService) {
  }
  ngOnInit() {
    let user_id = 0;
    if (this.route.snapshot.params['user_id']){
      user_id = this.route.snapshot.params['user_id'];
    } else if (this.authService.isLoggedIn()){
      user_id = this.authService.getUserId();
    } else {
      this.router.navigate(['/error']);
    }
    this.userService.getUserById(user_id).subscribe((user ) => {
      if (user === null) {
        this.router.navigate(['/error']);
      }
      this.user = user;
      this.plantService.getPlantsByUserId(user_id).subscribe((plants) => {
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

  protected readonly ApiService = ApiService;
}
