import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {UserModel} from "../../models/user.model";

import {ApiService} from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint = 'user';

  constructor(private apiService: ApiService) {
  }

  getBotanists(): Observable<UserModel[]> {
    return this.apiService.get<UserModel[]>(this.endpoint + '/botanist').pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any) => UserModel.fromJson(json));
      })
    );
  }

  register(formData: FormData): Observable<any> {
    return this.apiService.post(this.endpoint + '/register', formData);
  }

  login(formData: { password: string | undefined; username: any }): Observable<any> {
    return this.apiService.post(this.endpoint + '/login', formData, {headers: {'Content-Type': 'application/json'}});
  }

  getUsers(searchValue: string): Observable<UserModel[]> {
    return this.apiService.get<UserModel[]>(`${this.endpoint}/search?name=${searchValue}`).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any) => UserModel.fromJson(json));
      })
    );
  }

  getUserById(id: number): Observable<UserModel> {
    return this.apiService.get<UserModel>(`${this.endpoint}/${id}`).pipe(
      map((json: any) => UserModel.fromJson(json))
    );
  }
}
