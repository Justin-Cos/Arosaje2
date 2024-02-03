import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !(token === null || token.length === 0);
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
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
}
