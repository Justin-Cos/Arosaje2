import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ApiService } from '../api.service';
import {PlantModel} from "../../models/plant.model";
@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private endpoint = 'plant';

  constructor(private apiService: ApiService) {
  }

  public getPlants(): Observable<PlantModel[]> {
    return this.apiService.get<PlantModel[]>(this.endpoint).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any) => PlantModel.fromJson(json));
      })
    );
  }
  public getPlantById(id: number): Observable<PlantModel> {
    return this.apiService.get<PlantModel>(`${this.endpoint}/${id}`).pipe(
      map((json: any) => PlantModel.fromJson(json))
    );
  }
}
