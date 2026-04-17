import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { TokenService } from './token.service';
import { AuthResult, JwtPayload } from '../../domain/models/auth.models';
import {
  LoginRequestDto,
  ChangePasswordRequestDto,
  RequestPasswordResetDto,
  CompletePasswordResetDto,
} from '../dtos/auth.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);

  private readonly _currentPayload = signal<JwtPayload | null>(null);

  constructor() {
    this._currentPayload.set(this.tokenService.decodePayload());
  }
  /**
   * RF-1.01/RF-1.07: Estado reactivo del payload del usuario autenticado.
   *
   * `currentPayload` expone el payload decodificado del JWT como `Signal` de solo lectura.
   */
  readonly currentPayload = this._currentPayload.asReadonly();

  readonly isAuthenticated = computed(
    () => this._currentPayload() !== null && !this.tokenService.isTokenExpired(),
  );

  readonly userRole = computed(() => this._currentPayload()?.roleName ?? null);

  readonly mustChangePassword = computed(
    () => this._currentPayload()?.mustChangePassword ?? false,
  );

  /** RF-1.01: Login con usuario y contraseña */
  login(dto: LoginRequestDto): Observable<AuthResult> {
    return this.http
      .post<AuthResult>(`${environment.apiBaseUrl}/auth/login`, dto)
      .pipe(
        tap((result) => {
          if (result.token) {
            this.tokenService.setToken(result.token);
            this._currentPayload.set(this.tokenService.decodePayload());
          }
        }),
      );
  }

  /** RF-1.03/RF-1.06: Cambiar contraseña del usuario autenticado */
  changePassword(dto: ChangePasswordRequestDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${environment.apiBaseUrl}/auth/change-password`,
      dto,
    );
  }

  /** RF-1.04: Solicitar enlace de recuperación de contraseña */
  forgotPassword(dto: RequestPasswordResetDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${environment.apiBaseUrl}/auth/forgot-password`,
      dto,
    );
  }

  /** RF-1.04: Completar restablecimiento de contraseña */
  resetPassword(dto: CompletePasswordResetDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${environment.apiBaseUrl}/auth/reset-password`,
      dto,
    );
  }

  /** RF-1.01: Cerrar sesión y limpiar estado */
  logout(): void {
    this.tokenService.removeToken();
    this._currentPayload.set(null);
    this.router.navigate(['/auth/login']);
  }

  /** RF-1.08: Redirigir al dashboard correspondiente según el rol */
  redirectToDashboard(): void {
    const role = this.userRole();
    console.log('Redirecting to dashboard for role:', role);
    if (role === 'PlatformOwner') {
      this.router.navigate(['/owner/dashboard']);
    } else if (role === 'TenantAdmin') {
      this.router.navigate(['/tenant/dashboard']);
    } else {
      console.error('Role unknown or missing, redirecting to login');
      this.logout();
    }
  }
}
