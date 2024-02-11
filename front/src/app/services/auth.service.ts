import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn() {
    if (typeof window === 'undefined') {
      return false
    } else {
      const token = localStorage.getItem('token');
    return !(token === null || token.length === 0);
    }
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
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
