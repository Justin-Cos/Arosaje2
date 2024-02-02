import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  static baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    const url = `${ApiService.baseUrl}/${endpoint}`;
    return this.http.get<T>(url);
  }

  post<T>(endpoint: string, data: any , options?:{}): Observable<T> {
    const url = `${ApiService.baseUrl}/${endpoint}`;
    return this.http.post<T>(url, data, options);
  }

  delete<T>(endpoint: string, data: any): Observable<HttpEvent<T>> {
    const url = `${ApiService.baseUrl}/${endpoint}`;
    return this.http.delete<T>(url, data);
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    const url = `${ApiService.baseUrl}/${endpoint}`;
    return this.http.put<T>(url, data);
  }
}
