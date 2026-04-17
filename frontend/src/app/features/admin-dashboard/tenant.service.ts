import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tenant, CreateTenantRequest, CreateTenantResponse } from './tenant.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/tenants`;

  /** Obtiene la lista de tenants (PlatformOwner). */
  getTenants(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(this.apiUrl);
  }

  /** Crea un nuevo tenant. */
  createTenant(request: CreateTenantRequest): Observable<CreateTenantResponse> {
    return this.http.post<CreateTenantResponse>(this.apiUrl, request);
  }

  /** Alterna el estado activo de un tenant por ID. */
  toggleStatus(id: string): Observable<Tenant> {
    return this.http.put<Tenant>(`${this.apiUrl}/${id}/toggle-status`, {});
  }
}
