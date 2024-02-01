import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ApiService } from '../api.service';
import {CareSessionModel} from "../../models/care-session.model";
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
}
