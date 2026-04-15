export interface Tenant {
  id: string;
  name: string;
  phone: string;
  adminEmail: string;
  isActive: boolean;
  incurredSpend: number;
  createdAt: string;
}

export interface CreateTenantRequest {
  name: string;
  phone: string;
  adminEmail: string;
  isActive: boolean;
}

export interface CreateTenantResponse {
  id: string;
  name: string;
  adminEmail: string;
  temporaryPassword: string;
}
