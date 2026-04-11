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
  status: 'ACTIVE';
  environments: { id: string; type: 'SANDBOX' | 'PRODUCTION' }[];
  initialUser: {
    email: string;
    temporaryPassword: string;
  };
}
