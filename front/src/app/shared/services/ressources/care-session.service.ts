import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ApiService} from '../api.service';
import {CareSessionModel} from "../../models/care-session.model";
import {AddressModel} from "../../models/address.model";
import {UserModel} from "../../models/user.model";
import {PlantModel} from "../../models/plant.model";
import {CommentModel} from "../../models/comment.model";

@Injectable({
  providedIn: 'root',
})
export class CareSessionService {
  private endpoint = 'care-session';

  constructor(private apiService: ApiService) {
  }

  getCareSessionById(id: number): Observable<any> {
    return this.apiService.get<CareSessionModel>(`${this.endpoint}/${id}`).pipe(
      map((json: any) => {
        const careSession = CareSessionModel.fromJson(json);
        let user: UserModel | null = null;
        if (json["User"]) {
          user = UserModel.fromJson(json["User"]);
        }

        const address = AddressModel.fromJson(json["Address"]);
        let comments: CommentModel[] = [];
        const plant = {
          plant: PlantModel.fromJson(json["Plant"]),
          owner: UserModel.fromJson(json["Plant"]["User"])
        }
        if (json["Comments"]) {
          comments = json["Comments"].map((comment: any) => {
              return {
                comment: CommentModel.fromJson(comment),
                author: UserModel.fromJson(comment['User'])
              }
            }
          );
        }

        return {
          careSession,
          plant,
          user,
          address,
          comments
        };
      })
    );
  }

  getCareSessions(caretaker?: number): Observable<any> {
    let url = this.endpoint;

    if (caretaker) {
      url += `?caretaker=${caretaker}`;
    }
    return this.apiService.get<CareSessionModel[]>(url).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any[]) => {
          const careSession = CareSessionModel.fromJson(json);
          // @ts-ignore
          const plant = PlantModel.fromJson(json["Plant"]);

          return {
            careSession,
            plant
          };
        });
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

  getAvailableCareSessions(owner?: number): Observable<any> {
    let url = this.endpoint + '/available';

    if (owner) {
      url += `?owner=${owner}`;
    }
    return this.apiService.get<CareSessionModel[]>(url).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any[]) => {
          const careSession = CareSessionModel.fromJson(json);
          // @ts-ignore
          const plant = PlantModel.fromJson(json["Plant"]);

          return {
            careSession,
            plant
          };
        });
      })
    );
  }

  /**
   * Get the previous care session
   * @param caretaker - caretaker ou owner
   * @param user
   */
  getPreviousCareSession(caretaker?: boolean, user?: number): Observable<any> {
    let url = this.endpoint + '/previous';

    if (caretaker && user) {
      url += `?caretaker=${user}`;
    } else if (user) {
      url += `?owner=${user}`;
    }
    return this.apiService.get<CareSessionModel[]>(url).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any[]) => {
          const careSession = CareSessionModel.fromJson(json);
          // @ts-ignore
          const plant = PlantModel.fromJson(json["Plant"]);

          return {
            careSession,
            plant
          };
        });
      })
    );
  }

  getNearbyCareSessions(addressId: string, maxDistance: string): Observable<any> {
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

  createCareSession(plant: number, address: number, startDate: Date, endDate: Date, details?: null | string): Observable<any> {
    return this.apiService.post<CareSessionModel>(this.endpoint, {
      plant,
      location: address,
      date_start: startDate,
      date_end: endDate,
      details
    });
  }

  updateCareSession(careSession: CareSessionModel): Observable<any> {
    return this.apiService.put<CareSessionModel>(`${this.endpoint}/${careSession.session_id}`, {
      plant: careSession.plant,
      location: careSession.location,
      date_start: careSession.date_start,
      date_end: careSession.date_end,
      details: careSession.details,
      caretaker: careSession.caretaker,
    });
  }
}
