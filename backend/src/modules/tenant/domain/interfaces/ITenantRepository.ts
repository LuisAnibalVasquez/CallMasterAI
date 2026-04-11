import { Tenant } from '../entities/Tenant';

export interface ITenantRepository {
  save(tenant: Tenant): Promise<void>;
  findAll(): Promise<Tenant[]>;
  findById(id: string): Promise<Tenant | null>;
  update(tenant: Tenant): Promise<void>;
}
