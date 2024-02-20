import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {AddressService} from "../../../../shared/services/ressources/address.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {MessageModule} from "primeng/message";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MessageModule,
    NgIf
  ],
  styleUrls: ['../form-modal.component.scss']
})
export class AddressFormComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  country!: string;
  city!: string;
  address!: string;
  zip_code!: string;
  longitude!: number;
  latitude!: number;
  errorMessage: string = '';
  errorCountry: boolean = false;
  errorCity: boolean = false;
  errorAddress: boolean = false;
  errorZipCode: boolean = false;
  errorLongitude: boolean = false;
  errorLatitude: boolean = false;

  constructor(private addressService: AddressService, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(addressForm: NgForm) {
    const countryRegEx = /^[a-zA-Z]+$/;
    const cityRegEx = /^[a-zA-Z]+$/;

    this.errorCountry = this.country === undefined || !countryRegEx.test(this.country);
    this.errorCity = this.city === undefined || !cityRegEx.test(this.city);
    this.errorAddress = this.address === undefined;
    this.errorZipCode = this.zip_code === undefined || this.zip_code.length !== 5;
    this.errorLongitude = this.longitude === undefined || this.longitude < -180 || this.longitude > 180;
    this.errorLatitude = this.latitude === undefined || this.latitude < -90 || this.latitude > 90;
    if (addressForm.valid && !this.errorCountry && !this.errorCity && !this.errorAddress && !this.errorZipCode && !this.errorLongitude && !this.errorLatitude) {
      const formData = new FormData();

      formData.append('country', this.country);
      formData.append('city', this.city);
      formData.append('address', this.address);
      formData.append('zip_code', this.zip_code);
      formData.append('owner', this.authService.getUserId().toString());
      formData.append('longitude', this.longitude.toString());
      formData.append('latitude', this.latitude.toString());
      this.addressService.createAddress(formData).subscribe(
        (response) => {
          this.authService.updateToken();
          this.closeModal.emit();
        },
        (error) => {
          this.errorMessage = error.error?.message;
        }
      );
    }
  }
}
