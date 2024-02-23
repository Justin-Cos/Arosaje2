import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ApiService} from '../api.service';
import {PlantModel} from "../../models/plant.model";

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private endpoint = 'plant';

  constructor(private apiService: ApiService) {
  }

  public getPlantById(id: number): Observable<PlantModel> {
    return this.apiService.get<PlantModel>(`${this.endpoint}/${id}`).pipe(
      map((json: any) => PlantModel.fromJson(json))
    );
  }

  public getPlantsByUserId(user_id: number): Observable<PlantModel[]> {
    return this.apiService.get<PlantModel[]>(`${this.endpoint}/user/${user_id}`).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any) => PlantModel.fromJson(json));
      })
    );
  }

  public createPlant(formData: FormData): Observable<any> {
    return this.apiService.post<any>(this.endpoint, formData);
  }
}
