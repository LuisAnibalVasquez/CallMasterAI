import { Repository } from 'typeorm';
import { ITenantSettingsRepository } from '../../domain/repositories/ITenantSettingsRepository';
import { TenantSettings } from '../../domain/entities/TenantSettings';
import { TenantSettingsOrmEntity } from './tenant-settings.orm-entity';
export declare class TenantSettingsRepositoryImpl implements ITenantSettingsRepository {
    private readonly repo;
    constructor(repo: Repository<TenantSettingsOrmEntity>);
    findByTenantId(tenantId: string): Promise<TenantSettings | null>;
    save(settings: TenantSettings): Promise<void>;
}
