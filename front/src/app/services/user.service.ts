import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { ApiService } from './api.service';
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint = 'users';

  constructor(private apiService: ApiService) {}

  getUsers(): Observable<any> {
    return this.apiService.get<any>(this.endpoint);
  }

  getBotanists(): Observable<UserModel[]> {
    return this.apiService.get<UserModel[]>(this.endpoint + '/botanist').pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any) => UserModel.fromJson(json));
      })
    );
  }
  getUserById(userId: number): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/${userId}`);
  }
}
