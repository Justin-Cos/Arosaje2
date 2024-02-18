import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ApiService } from '../api.service';
import {CareSessionModel} from "../../models/care-session.model";
import {AddressModel} from "../../models/address.model";
@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private endpoint = 'address';
  constructor(private apiService: ApiService) {
  }
  getAddressById(addressId: string): Observable<AddressModel> {
    return this.apiService.get<AddressModel>(`${this.endpoint}/${addressId}`).pipe(
      map((json: any) => AddressModel.fromJson(json))
    );
  }
  getAddressesByUserId(userId: number): Observable<AddressModel[]> {
    return this.apiService.get<AddressModel[]>(`${this.endpoint}/user/${userId}`).pipe(
      map((json: any) => json.map((address: any) => AddressModel.fromJson(address)))
    );
  }
  createAddress(formData: FormData): Observable<AddressModel> {
    console.log(formData.get('owner'));
    return this.apiService.post<AddressModel>(this.endpoint, {
      country: formData.get('country'),
      city: formData.get('city'),
      address: formData.get('address'),
      zip_code: formData.get('zip_code'),
      owner: formData.get('owner'),
      longitude: formData.get('longitude'),
      latitude: formData.get('latitude')
    }).pipe(
      map((json: any) => AddressModel.fromJson(json))
    );
  }
  deleteAddress(addressId: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${addressId}`);
  }
}
