import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MessageModule} from "primeng/message";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FileUpload, FileUploadModule} from "primeng/fileupload";
import {PlantTypeService} from "../../../services/ressources/plant-type.service";
import {PlantTypeModel} from "../../../models/plant-type.model";
import {PlantService} from "../../../services/ressources/plant.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-plant-form',
  standalone: true,
  imports: [
    FormsModule,
    MessageModule,
    NgForOf,
    NgIf,
    PaginatorModule,
    FileUploadModule
  ],
  templateUrl: './plant-form.component.html',
  styleUrl: '../form-modal.component.scss'
})
export class PlantFormComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: FileUpload | undefined;
  @Output() closeModal = new EventEmitter<void>();

  name!: string;
  errorName: boolean = false;
  errorTypePlant: boolean = false;
  plantTypes!: PlantTypeModel[];
  plantType!: number;
  isIndoor: boolean = false;
  errorMessage!: string;

  constructor(private plantTypeService: PlantTypeService, private plantService: PlantService, private authService: AuthService) {}


  ngOnInit(): void {
    this.plantTypeService.getPlantTypes().subscribe(
      (plantTypes) => {
        this.plantTypes = plantTypes;
      },
    );
  }
  onSubmit(publicationForm: NgForm) {
    const plantNameRegEx = /^[a-zA-Z0-9_-]+$/;
    this.errorName = this.name === undefined || !plantNameRegEx.test(this.name)
    this.errorTypePlant = this.plantType === undefined;

    if (publicationForm.valid && !this.errorName && !this.errorTypePlant) {
      const formData = new FormData();

      formData.append('name', this.name);
      formData.append('plant_type', this.plantType.toString());
      formData.append('owner_id', this.authService.getUserId().toString())
      formData.append('indoor', this.isIndoor.toString());
      if (this.fileUpload && this.fileUpload.files.length > 0) {
        formData.append('image_file', this.fileUpload.files[0]);
      }
      this.plantService.createPlant(formData).subscribe(
        (response) => {
          this.closeModal.emit();
        },
        (error) => {
          this.errorMessage = error.error?.message;
        }
      );
    }
  }
}
