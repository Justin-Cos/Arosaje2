import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ApiService} from '../api.service';
import {PlantTypeModel} from "../../models/plant-type.model";

@Injectable({
  providedIn: 'root',
})
export class PlantTypeService {
  private endpoint = 'plant-type';

  constructor(private apiService: ApiService) {
  }

  public getPlantTypes(): Observable<PlantTypeModel[]> {
    return this.apiService.get<PlantTypeModel[]>(this.endpoint).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any) => PlantTypeModel.fromJson(json));
      })
    );
  }

}
