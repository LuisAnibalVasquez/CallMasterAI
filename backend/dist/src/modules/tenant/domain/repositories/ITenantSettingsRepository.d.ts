import { TenantSettings } from '../entities/TenantSettings';
export interface ITenantSettingsRepository {
    findByTenantId(tenantId: string): Promise<TenantSettings | null>;
    save(settings: TenantSettings): Promise<void>;
}
