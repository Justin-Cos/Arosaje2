import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {UserModel, UserRole} from "../models/user.model";

import {ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint = 'user';

  constructor(private apiService: ApiService) {}

  getBotanists(): Observable<UserModel[]> {
    return this.apiService.get<UserModel[]>(this.endpoint + '/botanist').pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any) => UserModel.fromJson(json));
      })
    );
  }

   /*
  getBotanists(): UserModel[] {
    return [new UserModel("a", "a", "david.jpg", "a", UserRole.botanist)]//.fromJson({"user_id":2,"username":"john_doe","email":"john@example.com","password":"hashed_password","profile_picture":"john_doe.jpg","bio":null,"role":"botanist"})
}*/
}
