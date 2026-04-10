import { Injectable } from '@angular/core';
import { JwtPayload } from '../../domain/models/auth.models';

const TOKEN_KEY = 'cm_access_token';

@Injectable({ providedIn: 'root' })
export class TokenService {

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  isTokenPresent(): boolean {
    return !!this.getToken();
  }

  decodePayload(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const base64Payload = token.split('.')[1];
      const decoded = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const payload = this.decodePayload();
    if (!payload?.exp) return true;
    return Date.now() >= payload.exp * 1000;
  }
}
