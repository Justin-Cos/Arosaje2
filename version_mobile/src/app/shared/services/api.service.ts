import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  static readonly baseUrl = 'http://192.168.56.1:3000';
  static readonly apiBaseRoute = 'http://192.168.56.1:3000/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) {}

  get<T>(endpoint: string): Observable<T> {
    const url = `${ApiService.apiBaseRoute}/${endpoint}`;
    let headers = {};
    if (this.authService.isLoggedIn()) {
      headers =  new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      })
    }
    return this.http.get<T>(url, {headers})
  }

  post<T>(endpoint: string, data: any, options?: {}): Observable<T> {
    const url = `${ApiService.apiBaseRoute}/${endpoint}`;
    let headers = {};
    if (this.authService.isLoggedIn()) {
      headers = {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    }
    let httpOptions = { headers: new HttpHeaders(headers), ...options };
    return this.http.post<T>(url, data, httpOptions);
  }

  delete<T>(endpoint: string): Observable<T> {
    const url = `${ApiService.apiBaseRoute}/${endpoint}`;
    let headers = {};
    if (this.authService.isLoggedIn()) {
      headers =  new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      })
    }
    return this.http.delete<T>(url, {headers});
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    const url = `${ApiService.apiBaseRoute}/${endpoint}`;
    let headers = {};
    if (this.authService.isLoggedIn()) {
      headers =  new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      })
    }
    return this.http.put<T>(url, data, {headers});
  }
}
