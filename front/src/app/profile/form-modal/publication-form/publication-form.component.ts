import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlantModel} from "../../../models/plant.model";
import {PlantService} from "../../../services/ressources/plant.service";
import {AuthService} from "../../../services/auth.service";
import {NgForOf, NgIf} from "@angular/common";
import {FileUploadModule} from "primeng/fileupload";
import {AddressService} from "../../../services/ressources/address.service";
import {AddressModel} from "../../../models/address.model";
import {FormsModule, NgForm} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {MessageModule} from "primeng/message";
import {CareSessionService} from "../../../services/ressources/care-session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-publication-form',
  standalone: true,
  imports: [
    NgForOf,
    FileUploadModule,
    FormsModule,
    PaginatorModule,
    MessageModule,
    NgIf
  ],
  templateUrl: './publication-form.component.html',
  styleUrl: '../form-modal.component.scss'
})
export class PublicationFormComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  constructor(private plantService: PlantService, private addressService: AddressService, private careSessionService: CareSessionService, private authService: AuthService, private router: Router) {}
  plants: PlantModel[] = [];
  addresses: AddressModel[] = [];
  errorPlant: boolean = false;
  errorAddress: boolean = false;
  errorStartDate: boolean = false;
  errorEndDate: boolean = false;
  errorMessage: string = "";
  tried_once: boolean = false;
  plant!: number;
  address!: number;
  startDate!: Date;
  endDate!: Date;
  details!: string ;
  ngOnInit() {
    this.plantService.getPlantsByUserId(this.authService.getUserId()).subscribe((plants: PlantModel[]) => {
      this.plants = plants;
    });
    this.addresses = this.authService.getAddresses()
  }


  onSubmit(publicationForm: NgForm) {
    this.tried_once = true;
    if (publicationForm.valid) {
      this.errorPlant = this.plant === undefined || this.plant == 0;
      console.log(this.address);
      this.errorAddress = this.address === undefined || this.address == 0;
      this.errorStartDate = this.startDate === undefined;
      this.errorEndDate = this.endDate === undefined;
      if (this.errorPlant || this.errorAddress || this.errorStartDate || this.errorEndDate) {
        return;
      }
      this.careSessionService.createCareSession(this.plant, this.address, this.startDate, this.endDate, this.details ?? null).subscribe(
        (res) => {
          this.closeModal.emit();
          },
        (error) => {
          console.log(error);
          this.errorMessage = error.message;
        })
    }
  }
}
