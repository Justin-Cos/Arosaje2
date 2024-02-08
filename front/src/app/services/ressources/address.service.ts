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
}
