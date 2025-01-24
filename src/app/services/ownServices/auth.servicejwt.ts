// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceJwt {

  saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');

  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  saveUser(user:number): void {
    localStorage.setItem('user', user.toString());
  }

  getUser(): number | null {
    const token = localStorage.getItem('user');
    if (token) {
      return parseInt(token, 10);
    }
    return null; 
  }
}
