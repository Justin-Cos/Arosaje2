import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/ressources/user.service";
import {CarouselComponent} from "../home/carousel/carousel.component";
import {CarouselModule} from "primeng/carousel";
import {ButtonModule} from "primeng/button";
import {ApiService} from "../../shared/services/api.service";
import {AvatarModule} from "primeng/avatar";
import {PlantModel} from "../../shared/models/plant.model";
import {UserModel} from "../../shared/models/user.model";
import {PlantService} from "../../shared/services/ressources/plant.service";
import {CareSessionService} from "../../shared/services/ressources/care-session.service";
import {CareSessionModel} from "../../shared/models/care-session.model";
import {DialogModule} from "primeng/dialog";
import {PlantFormComponent} from "./form-modal/plant-form/plant-form.component";
import { switchMap } from 'rxjs/operators';
import {AddressModel} from "../../shared/models/address.model";
import {AddressService} from "../../shared/services/ressources/address.service";
import {AddressFormComponent} from "./form-modal/address-form/address-form.component";
import {PublicationFormComponent} from "./form-modal/publication-form/publication-form.component";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CarouselComponent,
    CarouselModule,
    ButtonModule,
    AvatarModule,
    DialogModule,
    PlantFormComponent,
    AddressFormComponent,
    PublicationFormComponent,
    RouterLink,
    ConfirmDialogModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: UserModel;
  plants: PlantModel[] = []
  availableCareSessions: CareSessionModel[] = [];
  previousCareSessions: CareSessionModel[] = [];

  careTakerExperiences: CareSessionModel[] = [];

  protected readonly ApiService = ApiService;
  displayPlantForm: boolean = false;
  addresses: AddressModel[] = [];
  displayAddressForm: boolean = false;
  displayCareSessionForm: boolean = false;
  displayDeleteUserDialog: boolean = false;
  constructor(private route: ActivatedRoute, public authService: AuthService, private router: Router, private userService: UserService, private addressService: AddressService, private plantService: PlantService, private careSessionService: CareSessionService) {
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
      this.addressService.getAddressesByUserId(this.user.user_id).subscribe((addresses) => {
        this.addresses = addresses;
      });
      this.careSessionService.getAvailableCareSessions(this.user.user_id).subscribe((careSessions) => {
        this.availableCareSessions = careSessions;
      })
      this.careSessionService.getPreviousCareSession(false, this.user.user_id).subscribe((previousCareSessions) => {
        this.previousCareSessions = previousCareSessions;
      })
      this.careSessionService.getPreviousCareSession(true, this.user.user_id).subscribe((careTakerExperiences) => {
        this.careTakerExperiences = careTakerExperiences;
      })
    });
  }

  deleteAddress(address: AddressModel) {
    this.addressService.deleteAddress(address.address_id).subscribe(() => {
      this.authService.updateToken();
      this.ngOnInit()
    });
  }
  openPlantForm() {
    this.displayPlantForm = true;
  }
  closePlantForm() {
    this.displayPlantForm = false;
    this.ngOnInit();
  }
  openAddressForm() {
    this.displayAddressForm = true;
  }
  closeAddressForm() {
    this.displayAddressForm = false;
    this.ngOnInit();
  }
  openCareSessionPublicationForm() {
    this.displayCareSessionForm = true;
  }
  closeCareSessionPublicationForm() {
    this.displayCareSessionForm = false;
    this.ngOnInit();
  }
  deleteUser() {
    this.displayDeleteUserDialog = true;
  }

  confirmDeleteUser() {
    this.userService.deleteUser(this.user.user_id).subscribe(() => {
      this.authService.logout();
      this.router.navigate(['/']);
    });
    this.displayDeleteUserDialog = false;
  }

  cancelDeleteUser() {
    this.displayDeleteUserDialog = false;
  }
}
