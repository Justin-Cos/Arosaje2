import {Component, OnInit} from '@angular/core';
import {CarouselComponent} from "../carousel.component";
import {UserService} from "../../../services/ressources/user.service";
import {UserModel} from "../../../models/user.model";
import {ApiService} from "../../../services/api.service";


@Component({
  selector: 'app-profiles-carousel',
  standalone: true,
  imports: [
    CarouselComponent,
  ],
  templateUrl: './profiles-carousel.component.html',
})
export class ProfilesCarouselComponent implements OnInit {
  private userService: UserService;
  title = "Botanistes récommandés";
  botanists: UserModel[] = [];
  slides: { img: string; nom: string; bio: string; }[] = [];

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit() {
    this.userService.getBotanists().subscribe((botanists: UserModel[]) => {
      this.botanists = botanists;

      this.slides = this.botanists.map(botanist => {
        return {
          img: `${ApiService.baseUrl}/uploads/profile_pictures/${botanist.profile_picture}`,
          nom: botanist.username,
          bio: botanist.bio !== 'undefined' ? botanist.bio : "J'aime les plantes !",
        };
      });
    });
  }
}
