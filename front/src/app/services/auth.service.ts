import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }
  isLoggedIn() {
    if (typeof window === 'undefined') {
      return false
    } else {
      const token = localStorage.getItem('token');
    return !(token === null || token.length === 0);
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  saveToken(token: string) {
    console.log(localStorage.getItem('token'));

    localStorage.setItem('token', token);
  }
  updateToken() {
    console.log('update token');
    this.http.get(ApiService.baseUrl + '/user/update-token?user=' + this.getUserId()).subscribe((response: any) => {
      this.saveToken(response.token);
    });
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getUserId(): number {
    const storedToken = this.getToken();
    if (storedToken) {
      const tokenData = JSON.parse(atob(storedToken.split('.')[1]));
      return tokenData.user_id;
    }
    return 0;
  }
  getUsername(): string {
    const storedToken = this.getToken();
    if (storedToken) {
      const tokenData = JSON.parse(atob(storedToken.split('.')[1]));
      return tokenData.username;
    }
    return '';
  }

  getProfilePic(): string {
    const storedToken = this.getToken();
    if (storedToken) {
      const tokenData = JSON.parse(atob(storedToken.split('.')[1]));
      return tokenData.profile_picture;
    }
    return '';
  }

  getRole(): string {
    const storedToken = this.getToken();
    if (storedToken) {
      const tokenData = JSON.parse(atob(storedToken.split('.')[1]));
      return tokenData.role;
    }
    return '';
  }
  getAddresses(): [] {
    const storedToken = this.getToken();
    if (storedToken) {
      const tokenData = JSON.parse(atob(storedToken.split('.')[1]));
      return tokenData.addresses;
    }
    return [];
  }
}
