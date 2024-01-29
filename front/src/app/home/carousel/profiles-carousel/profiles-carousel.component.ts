import {Component, OnInit} from '@angular/core';
import {CarouselComponent} from "../carousel.component";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/user.model";

@Component({
  selector: 'app-profiles-carousel',
  standalone: true,
  imports: [
    CarouselComponent,
  ],
  templateUrl: './profiles-carousel.component.html',
  styleUrl: './profiles-carousel.component.css'
})
export class ProfilesCarouselComponent implements OnInit {
  private userService: UserService;
  title = "Botanistes";
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
          img: 'assets/uploads/users_profile_pictures/' + botanist.profile_picture,
          nom: botanist.username,
          bio: botanist.bio,
        };
      });
    });
  }
}
