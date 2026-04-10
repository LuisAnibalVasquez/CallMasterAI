import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UpdatePasswordPolicyDto, PasswordPolicyResponseDto } from '../dtos/tenant.dto';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/tenants/settings`;

  /** RF-1.05: Obtener política de caducidad de contraseña del tenant */
  getPasswordPolicy(): Observable<PasswordPolicyResponseDto> {
    return this.http.get<PasswordPolicyResponseDto>(`${this.base}/password-policy`);
  }

  /** RF-1.05: Actualizar política de caducidad de contraseña del tenant */
  updatePasswordPolicy(dto: UpdatePasswordPolicyDto): Observable<PasswordPolicyResponseDto> {
    return this.http.put<PasswordPolicyResponseDto>(`${this.base}/password-policy`, dto);
  }
}
