import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ApiService } from '../api.service';
import {CareSessionModel} from "../../models/care-session.model";
import {AddressModel} from "../../models/address.model";
import {UserModel} from "../../models/user.model";
import {PlantModel} from "../../models/plant.model";
@Injectable({
  providedIn: 'root',
})
export class CareSessionService {
  private endpoint = 'care-session';

  constructor(private apiService: ApiService) {
  }

  getCareSessions(): Observable<CareSessionModel[]> {
    return this.apiService.get<CareSessionModel[]>(this.endpoint).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any) => CareSessionModel.fromJson(json));
      })
    );
  }
  getNextCareSessions(): Observable<CareSessionModel[]> {
    return this.apiService.get<CareSessionModel[]>(this.endpoint + '/next').pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any) => CareSessionModel.fromJson(json));
      })
    );
  }
  getAvailableCareSessions(): Observable<CareSessionModel[]> {
    return this.apiService.get<CareSessionModel[]>(this.endpoint + '/available').pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any) => CareSessionModel.fromJson(json));
      })
    );
  }getNearbyCareSessions(addressId: string, maxDistance: string): Observable<any> {
    return this.apiService.get<CareSessionModel[]>(`${this.endpoint}/nearby?address_id=${addressId}&maxDistance=${maxDistance}`).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any) => {
          const careSession = CareSessionModel.fromJson(json);
          const address = AddressModel.fromJson(json["Address"]);
          const plant = PlantModel.fromJson(json["Plant"]);
          const user = UserModel.fromJson(json["Plant"]["User"]);

          return {
            careSession,
            address,
            plant,
            user
          };
        });
      })
    );
  }
}
